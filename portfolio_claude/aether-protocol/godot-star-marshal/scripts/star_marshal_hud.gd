extends Node3D
## STAR MARSHAL — A LEI NÃO TERMINA NA ÚLTIMA ESTRELA
## Projeto Godot 4.7 Completo: Cena 3D (vespera_city.obj + star_marshal.obj) +
## HUD Dinâmico Contextual Anos 60 (Exploração, Combate, Crítico) +
## UI Diegética (Scanner de Pulso & Pistola de Raios) + Roda de Armas Spectra-7 (Bullet-Time).

enum HudState { EXPLORATION, COMBAT, CRITICAL }
enum Platform { PLAYSTATION, XBOX, PC }

var current_state: HudState = HudState.COMBAT
var current_platform: Platform = Platform.PLAYSTATION
var wheel_open: bool = false
var scanner_active: bool = false

var shield_pct: float = 78.0
var ammo_mag: int = 24
var ammo_max: int = 30
var weapon_heat: float = 22.0
var selected_weapon_idx: int = 1
var hovered_weapon_idx: int = 1
var recoil_bloom: float = 0.0
var time_accum: float = 0.0
var mouse_norm: Vector2 = Vector2.ZERO

const WEAPONS = [
	{"name": "PISTOLA DE RAIOS MK-II", "ammo": 24, "max": 30, "type": "FEIXE SOLAR CONTÍNUO"},
	{"name": "CARABINA DE PARTÍCULAS", "ammo": 120, "max": 120, "type": "RAJADA ATÔMICA MODULAR"},
	{"name": "DESINTEGRADOR SPECTRA", "ammo": 12, "max": 15, "type": "PULSO DE PLASMA PESADO"},
	{"name": "GRANADA TERMO-SOLAR", "ammo": 4, "max": 4, "type": "DETONAÇÃO ORBITAL"},
	{"name": "MINA DISCO-SÔNICA", "ammo": 6, "max": 6, "type": "CAMPO GRAVITACIONAL"},
	{"name": "CÁPSULA CRIO-VESPERA", "ammo": 8, "max": 8, "type": "CONGELAMENTO SUB-ZERO"}
]

const GLYPHS = {
	Platform.PLAYSTATION: {"interact": "✕", "dodge": "◯", "reload": "▢", "scanner": "△", "lb": "L1", "rb": "R1", "name": "PLAYSTATION DUALSENSE"},
	Platform.XBOX:        {"interact": "A", "dodge": "B", "reload": "X", "scanner": "Y", "lb": "LB", "rb": "RB", "name": "XBOX SERIES CONTROLLER"},
	Platform.PC:          {"interact": "E", "dodge": "SPC", "reload": "R", "scanner": "V", "lb": "Q", "rb": "TAB", "name": "TECLADO & MOUSE (PC)"}
}

var camera_3d: Camera3D
var city_mesh_instance: MeshInstance3D
var marshal_pivot: Node3D
var planet_group: Node3D
var laser_beam_mesh: MeshInstance3D
var hud_canvas: Control

func _ready() -> void:
	_setup_environment()
	_load_3d_obj_models()
	_setup_hud_canvas()
	set_hud_state(HudState.COMBAT)
	set_platform_glyphs(Platform.PLAYSTATION)
	print("[Star Marshal] Cena 3D e HUD Contextual Anos 60 inicializados com sucesso.")

func _setup_environment() -> void:
	var env = Environment.new()
	env.background_mode = Environment.BG_COLOR
	env.background_color = Color("#0D3B49")
	env.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	env.ambient_light_color = Color("#1A6B7C")
	env.ambient_light_energy = 1.15
	env.glow_enabled = true
	env.glow_intensity = 0.8
	var world_env = WorldEnvironment.new()
	world_env.environment = env
	add_child(world_env)

	camera_3d = Camera3D.new()
	camera_3d.fov = 52.0
	camera_3d.position = Vector3(0.32, 0.76, -1.05)
	camera_3d.look_at_from_position(camera_3d.position, Vector3(-0.08, 0.68, 3.0), Vector3.UP)
	add_child(camera_3d)

	var sun = DirectionalLight3D.new()
	sun.light_color = Color("#F4A922")
	sun.light_energy = 2.1
	sun.rotation_degrees = Vector3(-28, -35, 0)
	add_child(sun)

	var rim = DirectionalLight3D.new()
	rim.light_color = Color("#2CC5C9")
	rim.light_energy = 1.2
	rim.rotation_degrees = Vector3(-15, 145, 0)
	add_child(rim)

	# 1. Planeta Anelado Vespera-9 no horizonte com texturas procedurais da prancha
	planet_group = Node3D.new()
	planet_group.position = Vector3(4.0, 9.5, 38.0)
	var p_mesh = MeshInstance3D.new()
	var sphere = SphereMesh.new()
	sphere.radius = 6.5
	sphere.height = 13.0
	var p_mat = StandardMaterial3D.new()
	p_mat.albedo_texture = _create_planet_texture()
	p_mat.roughness = 0.75
	p_mat.emission_enabled = true
	p_mat.emission = Color("#F4A922")
	p_mat.emission_energy_multiplier = 0.25
	sphere.material = p_mat
	p_mesh.mesh = sphere
	planet_group.add_child(p_mesh)

	# 2. Anéis Planetários com Fenda de Cassini
	var ring_mesh = _build_ring_mesh(8.2, 13.5, 64, _create_ring_texture())
	ring_mesh.rotation_degrees = Vector3(32, -22, 0)
	planet_group.add_child(ring_mesh)
	add_child(planet_group)

	# 3. Plataforma de Pouso Espacial (Deck com Tarmac, Zebras e Faixas Douradas)
	var deck_mesh = MeshInstance3D.new()
	var plane = PlaneMesh.new()
	plane.size = Vector2(60.0, 60.0)
	var deck_mat = StandardMaterial3D.new()
	deck_mat.albedo_texture = _create_deck_texture()
	deck_mat.uv1_scale = Vector3(4.0, 4.0, 4.0)
	deck_mat.roughness = 0.85
	deck_mat.metallic = 0.1
	plane.material = deck_mat
	deck_mesh.mesh = plane
	deck_mesh.position = Vector3(0.0, 0.0, 0.0)
	add_child(deck_mesh)

func _load_3d_obj_models() -> void:
	# 1. Cidade Espacial Vespera-9 (tripo_convert_4cfaeb0b)
	city_mesh_instance = MeshInstance3D.new()
	city_mesh_instance.name = "Vespera9City"
	city_mesh_instance.mesh = _build_city_colored_mesh("res://models/vespera_city.obj")
	city_mesh_instance.scale = Vector3(22.0, 22.0, 22.0)
	city_mesh_instance.position = Vector3(0.0, -1.2, 12.0)
	add_child(city_mesh_instance)

	# 2. Star Marshal em 3ª Pessoa (com paleta exata e texturas da prancha de referência)
	marshal_pivot = Node3D.new()
	marshal_pivot.name = "StarMarshalOperative"
	var marshal_inst = MeshInstance3D.new()
	marshal_inst.mesh = _build_vertex_colored_mesh("res://models/star_marshal.obj")
	marshal_pivot.add_child(marshal_inst)

	# A. Emblema Peitoral da Federação Solar (Bússola Dourada Anos 60)
	var emblem_mesh = MeshInstance3D.new()
	var emblem_cyl = CylinderMesh.new()
	emblem_cyl.top_radius = 0.055
	emblem_cyl.bottom_radius = 0.055
	emblem_cyl.height = 0.008
	var emblem_mat = StandardMaterial3D.new()
	emblem_mat.albedo_texture = _create_emblem_texture()
	emblem_mat.roughness = 0.35
	emblem_mat.metallic = 0.7
	emblem_cyl.material = emblem_mat
	emblem_mesh.mesh = emblem_cyl
	emblem_mesh.position = Vector3(0.015, 0.52, 0.075)
	emblem_mesh.rotation_degrees = Vector3(90, 0, 0)
	marshal_pivot.add_child(emblem_mesh)

	# B. Scanner de Pulso CRT Diegético no Braço Direito
	var scanner_group = Node3D.new()
	scanner_group.position = Vector3(0.22, 0.52, 0.05)
	var crt_mesh = MeshInstance3D.new()
	var crt_box = BoxMesh.new()
	crt_box.size = Vector3(0.045, 0.045, 0.014)
	var crt_mat = StandardMaterial3D.new()
	crt_mat.albedo_texture = _create_wrist_scanner_texture()
	crt_mat.emission_enabled = true
	crt_mat.emission = Color("#2CC5C9")
	crt_mat.emission_energy_multiplier = 0.6
	crt_box.material = crt_mat
	crt_mesh.mesh = crt_box
	scanner_group.add_child(crt_mesh)
	marshal_pivot.add_child(scanner_group)

	# C. Pistola de Raios MK-II Bicolor no Braço Esquerdo
	var raygun_group = Node3D.new()
	raygun_group.position = Vector3(-0.24, 0.50, 0.16)
	raygun_group.rotation_degrees = Vector3(0, 15, 0)

	var rc_mesh = MeshInstance3D.new()
	var rc_box = BoxMesh.new()
	rc_box.size = Vector3(0.035, 0.065, 0.12)
	var rc_mat = StandardMaterial3D.new()
	rc_mat.albedo_color = Color("#F2E6CE") # Corpo Marfim
	rc_box.material = rc_mat
	rc_mesh.mesh = rc_box
	raygun_group.add_child(rc_mesh)

	var barrel_mesh = MeshInstance3D.new()
	var barrel_cyl = CylinderMesh.new()
	barrel_cyl.top_radius = 0.015
	barrel_cyl.bottom_radius = 0.015
	barrel_cyl.height = 0.09
	var barrel_mat = StandardMaterial3D.new()
	barrel_mat.albedo_color = Color("#D4A017") # Bobinas de Latão
	barrel_mat.metallic = 0.9
	barrel_cyl.material = barrel_mat
	barrel_mesh.mesh = barrel_cyl
	barrel_mesh.rotation_degrees = Vector3(90, 0, 0)
	barrel_mesh.position = Vector3(0, 0.01, 0.095)
	raygun_group.add_child(barrel_mesh)

	var muzzle_mesh = MeshInstance3D.new()
	var muzzle_sph = SphereMesh.new()
	muzzle_sph.radius = 0.018
	muzzle_sph.height = 0.036
	var muzzle_mat = StandardMaterial3D.new()
	muzzle_mat.albedo_color = Color("#E63926")
	muzzle_mat.emission_enabled = true
	muzzle_mat.emission = Color("#E63926")
	muzzle_mat.emission_energy_multiplier = 1.2
	muzzle_sph.material = muzzle_mat
	muzzle_mesh.mesh = muzzle_sph
	muzzle_mesh.position = Vector3(0, 0.01, 0.145)
	raygun_group.add_child(muzzle_mesh)
	laser_beam_mesh = muzzle_mesh

	add_child(marshal_pivot)

	# 3. Inimigo Alienígena Warlord Estelar Estático (tripo_convert_abd4572a)
	var enemy_inst = MeshInstance3D.new()
	enemy_inst.name = "StarWarlordEnemy"
	enemy_inst.mesh = _build_enemy_colored_mesh("res://models/enemy.obj")
	enemy_inst.scale = Vector3(1.68, 1.68, 1.68)
	enemy_inst.position = Vector3(-0.20, 0.0, 5.2)
	enemy_inst.rotation_degrees = Vector3(0, 153, 0)
	add_child(enemy_inst)

func _build_enemy_colored_mesh(obj_path: String) -> ArrayMesh:
	var f = FileAccess.open(obj_path, FileAccess.READ)
	if not f:
		return ArrayMesh.new()
	var raw_v := PackedVector3Array()
	var raw_c := PackedColorArray()
	var out_v := PackedVector3Array()
	var out_n := PackedVector3Array()
	var out_c := PackedColorArray()
	while not f.eof_reached():
		var line = f.get_line().strip_edges()
		if line.begins_with("v "):
			var p = line.split(" ", false)
			raw_v.append(Vector3(p[1].to_float(), p[2].to_float(), p[3].to_float()))
			if p.size() >= 7:
				raw_c.append(Color(p[4].to_float(), p[5].to_float(), p[6].to_float()))
			else:
				raw_c.append(Color("#D33C24"))
		elif line.begins_with("f "):
			var p = line.split(" ", false)
			var idxs: Array[int] = []
			for i in range(1, p.size()):
				idxs.append(p[i].split("/")[0].to_int() - 1)
			for i in range(1, idxs.size() - 1):
				var v0 = raw_v[idxs[0]]
				var v1 = raw_v[idxs[i]]
				var v2 = raw_v[idxs[i + 1]]
				var n = (v1 - v0).cross(v2 - v0).normalized()
				for k in [idxs[0], idxs[i], idxs[i + 1]]:
					out_v.append(raw_v[k])
					out_n.append(n)
					out_c.append(raw_c[k])
	var arrays = []
	arrays.resize(Mesh.ARRAY_MAX)
	arrays[Mesh.ARRAY_VERTEX] = out_v
	arrays[Mesh.ARRAY_NORMAL] = out_n
	arrays[Mesh.ARRAY_COLOR] = out_c
	var am = ArrayMesh.new()
	if out_v.size() > 0:
		am.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)
		var mat = StandardMaterial3D.new()
		mat.vertex_color_use_as_albedo = true
		mat.roughness = 0.45
		mat.metallic = 0.2
		am.surface_set_material(0, mat)
	return am

func _create_planet_texture() -> ImageTexture:
	var w = 256
	var h = 128
	var img = Image.create(w, h, false, Image.FORMAT_RGBA8)
	var col_deep = Color("#8B1E14")
	var col_crimson = Color("#E63926")
	var col_amber = Color("#F4A922")
	var col_cloud = Color("#F2E6CE")
	for y in range(h):
		var ny = float(y) / float(h)
		var base_col = col_deep.lerp(col_crimson, sin(ny * PI) * 0.85)
		base_col = base_col.lerp(col_amber, clamp(sin(ny * 14.0) * 0.25, 0.0, 0.35))
		var cloud = sin(ny * 22.0) * cos(ny * 8.0)
		if cloud > 0.4:
			base_col = base_col.lerp(col_cloud, (cloud - 0.4) * 0.45)
		if ny > 0.32 and ny < 0.44:
			base_col = base_col.darkened(0.55)
		for x in range(w):
			var nx = float(x) / float(w)
			var c_dist = Vector2(nx - 0.35, ny - 0.55).length()
			var p_col = base_col
			if c_dist < 0.08:
				p_col = p_col.darkened(0.28) if c_dist < 0.06 else p_col.lightened(0.18)
			var c_dist2 = Vector2(nx - 0.72, ny - 0.42).length()
			if c_dist2 < 0.06:
				p_col = p_col.darkened(0.25) if c_dist2 < 0.045 else p_col.lightened(0.15)
			img.set_pixel(x, y, p_col)
	return ImageTexture.create_from_image(img)

func _create_ring_texture() -> ImageTexture:
	var w = 256
	var h = 32
	var img = Image.create(w, h, false, Image.FORMAT_RGBA8)
	var c_amber = Color("#F4A922")
	var c_gold = Color("#F8D882")
	var c_crimson = Color("#E63926")
	for x in range(w):
		var nx = float(x) / float(w)
		var col = Color(0, 0, 0, 0)
		if nx > 0.48 and nx < 0.56:
			col = Color(0, 0, 0, 0)
		elif nx > 0.05 and nx < 0.95:
			var band = sin(nx * 48.0) * 0.5 + 0.5
			col = c_amber.lerp(c_gold, band)
			if nx < 0.35:
				col = col.lerp(c_crimson, 0.4)
			var alpha = sin(clamp((nx - 0.05) / 0.90, 0.0, 1.0) * PI) * 0.88
			col.a = alpha
		for y in range(h):
			img.set_pixel(x, y, col)
	return ImageTexture.create_from_image(img)

func _build_ring_mesh(inner_r: float, outer_r: float, segments: int, tex: Texture2D) -> MeshInstance3D:
	var am = ArrayMesh.new()
	var verts := PackedVector3Array()
	var uvs := PackedVector2Array()
	var norms := PackedVector3Array()
	var idxs := PackedInt32Array()
	for i in range(segments + 1):
		var angle = (float(i) / float(segments)) * TAU
		var ca = cos(angle)
		var sa = sin(angle)
		verts.append(Vector3(ca * inner_r, 0, sa * inner_r))
		uvs.append(Vector2(0.0, float(i) / float(segments)))
		norms.append(Vector3.UP)
		verts.append(Vector3(ca * outer_r, 0, sa * outer_r))
		uvs.append(Vector2(1.0, float(i) / float(segments)))
		norms.append(Vector3.UP)
	for i in range(segments):
		var base = i * 2
		idxs.append(base)
		idxs.append(base + 1)
		idxs.append(base + 2)
		idxs.append(base + 1)
		idxs.append(base + 3)
		idxs.append(base + 2)
	var arrays = []
	arrays.resize(Mesh.ARRAY_MAX)
	arrays[Mesh.ARRAY_VERTEX] = verts
	arrays[Mesh.ARRAY_TEX_UV] = uvs
	arrays[Mesh.ARRAY_NORMAL] = norms
	arrays[Mesh.ARRAY_INDEX] = idxs
	am.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)
	var mat = StandardMaterial3D.new()
	mat.albedo_texture = tex
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat.cull_mode = BaseMaterial3D.CULL_DISABLED
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	am.surface_set_material(0, mat)
	var mi = MeshInstance3D.new()
	mi.mesh = am
	return mi

func _create_deck_texture() -> ImageTexture:
	var size = 256
	var img = Image.create(size, size, false, Image.FORMAT_RGBA8)
	var col_tarmac = Color("#B8976C")
	var col_tarmac_dark = Color("#9D7850")
	var col_hazard_red = Color("#E63926")
	var col_hazard_cream = Color("#F2E6CE")
	var col_gold = Color("#F4A922")
	for y in range(size):
		for x in range(size):
			var c = col_tarmac if (int(x / 4) + int(y / 4)) % 2 == 0 else col_tarmac_dark
			if x < 24 or x > size - 25 or y < 24 or y > size - 25:
				var diag = (x + y) % 32
				c = col_hazard_red if diag < 16 else col_hazard_cream
			elif abs(x - size * 0.5) < 3.0 or abs(y - size * 0.5) < 3.0:
				c = col_gold
			elif abs(x - size * 0.5) < 60.0 and abs(y - size * 0.5) < 60.0:
				var dist = Vector2(x - size * 0.5, y - size * 0.5).length()
				if abs(dist - 48.0) < 2.5:
					c = col_gold
			img.set_pixel(x, y, c)
	return ImageTexture.create_from_image(img)

func _create_emblem_texture() -> ImageTexture:
	var size = 128
	var img = Image.create(size, size, false, Image.FORMAT_RGBA8)
	var center = Vector2(64, 64)
	for y in range(size):
		for x in range(size):
			var d = (Vector2(x, y) - center).length()
			var c = Color(0, 0, 0, 0)
			if d <= 60.0:
				if d > 54.0:
					c = Color("#D62828")
				elif d > 48.0:
					c = Color("#F4A922")
				elif d > 42.0:
					c = Color("#0D2735")
				else:
					c = Color("#0D2735")
					var diff = Vector2(x, y) - center
					var angle = atan2(diff.y, diff.x)
					var star_r = 12.0 + 26.0 * pow(abs(cos(angle * 2.0)), 3.0)
					if d < star_r:
						c = Color("#F8D882")
						if d < 7.0:
							c = Color("#E63926")
						elif d < 3.0:
							c = Color("#FFFFFF")
			img.set_pixel(x, y, c)
	return ImageTexture.create_from_image(img)

func _create_wrist_scanner_texture() -> ImageTexture:
	var size = 128
	var img = Image.create(size, size, false, Image.FORMAT_RGBA8)
	var center = Vector2(64, 64)
	for y in range(size):
		for x in range(size):
			var c = Color("#061820")
			var d = (Vector2(x, y) - center).length()
			if abs(d - 20.0) < 1.2 or abs(d - 38.0) < 1.2 or abs(d - 54.0) < 1.2:
				c = Color("#1A6B7C")
			if (abs(x - 64) < 1.2 and d < 56.0) or (abs(y - 64) < 1.2 and d < 56.0):
				c = Color("#1A6B7C")
			if d < 54.0:
				var diff = Vector2(x, y) - center
				var ang = atan2(diff.y, diff.x)
				if ang > -1.4 and ang < -0.3:
					c = c.lerp(Color("#2CC5C9"), 0.45)
			if (Vector2(x, y) - Vector2(88, 44)).length() < 3.5:
				c = Color("#E63926")
			if (Vector2(x, y) - Vector2(42, 82)).length() < 3.0:
				c = Color("#F4A922")
			if x < 4 or x > 123 or y < 4 or y > 123:
				c = Color("#2CC5C9")
			img.set_pixel(x, y, c)
	return ImageTexture.create_from_image(img)

func _build_city_colored_mesh(obj_path: String) -> ArrayMesh:
	var f = FileAccess.open(obj_path, FileAccess.READ)
	if not f:
		return ArrayMesh.new()
	var raw_v := PackedVector3Array()
	var out_v := PackedVector3Array()
	var out_n := PackedVector3Array()
	var out_c := PackedColorArray()
	while not f.eof_reached():
		var line = f.get_line().strip_edges()
		if line.begins_with("v "):
			var p = line.split(" ", false)
			raw_v.append(Vector3(p[1].to_float(), p[2].to_float(), p[3].to_float()))
		elif line.begins_with("f "):
			var p = line.split(" ", false)
			var idxs: Array[int] = []
			for i in range(1, p.size()):
				idxs.append(p[i].split("/")[0].to_int() - 1)
			for i in range(1, idxs.size() - 1):
				var v0 = raw_v[idxs[0]]
				var v1 = raw_v[idxs[i]]
				var v2 = raw_v[idxs[i + 1]]
				var n = (v1 - v0).cross(v2 - v0).normalized()
				for v in [v0, v1, v2]:
					out_v.append(v)
					out_n.append(n)
					var h = clamp(v.y / 0.45, 0.0, 1.0)
					var col = Color("#1A6B7C").lerp(Color("#F2E6CE"), h * 0.75)
					if h > 0.65:
						col = Color("#F4A922")
					out_c.append(col)
	var arrays = []
	arrays.resize(Mesh.ARRAY_MAX)
	arrays[Mesh.ARRAY_VERTEX] = out_v
	arrays[Mesh.ARRAY_NORMAL] = out_n
	arrays[Mesh.ARRAY_COLOR] = out_c
	var am = ArrayMesh.new()
	if out_v.size() > 0:
		am.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)
		var mat = StandardMaterial3D.new()
		mat.vertex_color_use_as_albedo = true
		mat.roughness = 0.35
		mat.metallic = 0.45
		am.surface_set_material(0, mat)
	return am

func _build_vertex_colored_mesh(obj_path: String) -> ArrayMesh:
	var f = FileAccess.open(obj_path, FileAccess.READ)
	if not f:
		return ArrayMesh.new()
	var raw_v := PackedVector3Array()
	var out_v := PackedVector3Array()
	var out_n := PackedVector3Array()
	var out_c := PackedColorArray()
	while not f.eof_reached():
		var line = f.get_line().strip_edges()
		if line.begins_with("v "):
			var p = line.split(" ", false)
			raw_v.append(Vector3(p[1].to_float(), p[2].to_float(), p[3].to_float()))
		elif line.begins_with("f "):
			var p = line.split(" ", false)
			var idxs: Array[int] = []
			for i in range(1, p.size()):
				idxs.append(p[i].split("/")[0].to_int() - 1)
			for i in range(1, idxs.size() - 1):
				var v0 = raw_v[idxs[0]]
				var v1 = raw_v[idxs[i]]
				var v2 = raw_v[idxs[i + 1]]
				var n = (v1 - v0).cross(v2 - v0).normalized()
				for k in [idxs[0], idxs[i], idxs[i + 1]]:
					var v = raw_v[k]
					out_v.append(v)
					out_n.append(n)
					
					# Paleta e texturas mapeadas diretamente da prancha de referência do Star Marshal
					var col = Color("#1D4E89") # Azul Cobalto Espacial
					if v.y > 0.72:
						# Capacete & Cabeça
						if abs(v.x) < 0.024 and v.z > -0.04:
							col = Color("#E63926") # Faixa Vermelha de Corrida Central
						elif v.z > 0.04 and abs(v.x) < 0.075 and v.y > 0.73 and v.y < 0.85:
							col = Color("#060914") # Viseira Escura Glazeada
						elif v.y < 0.745:
							col = Color("#D82820") # Gola de Selagem Carmesim
						else:
							col = Color("#F2E6CE") # Casco Marfim do Capacete
					elif v.y >= 0.44 and v.y <= 0.72:
						# Tronco, Ombreiras, Braços e Capa
						if v.z < -0.04 and abs(v.x) < 0.22:
							col = Color("#E63926").lerp(Color("#6B1208"), clamp(-v.z * 3.5, 0.0, 0.6)) # Capa Escarlate com Dobras Sombreadas
						elif abs(v.x) > 0.16 and v.y > 0.58:
							col = Color("#F2E6CE") # Ombreiras Marfim
						elif abs(v.x) > 0.17 and v.y <= 0.58:
							if v.y < 0.49:
								col = Color("#D4A017") if abs(v.x) < 0.23 else Color("#1A202C") # Manoplas de Latão & Luvas Escuras
							else:
								col = Color("#153243") # Manga Azul Marinho
						else:
							# Couraça Peitoral
							if v.z > 0.05 and abs(v.x) < 0.05 and abs(v.y - 0.54) < 0.04:
								col = Color("#F4A922") # Emblema Estrela Dourada Peitoral
							elif v.z > 0.04:
								col = Color("#1D4E89") # Frente Azul Cobalto
							else:
								col = Color("#14365D") # Costas Sombreadas
					elif v.y >= 0.38 and v.y < 0.44:
						# Cinto & Coldres
						col = Color("#F4A922") if (abs(v.x) < 0.035 and v.z > 0.03) else Color("#6E4424") # Fivela Dourada & Couro
					else:
						# Pernas, Joelheiras & Botas
						if v.y < 0.14:
							col = Color("#12161F") # Botas Espaciais Anti-Abrasão
						elif v.y >= 0.21 and v.y <= 0.27 and v.z > 0.03:
							col = Color("#E63926") # Joelheiras Vermelhas
						else:
							col = Color("#1D4E89") # Calças Azul Cobalto
							
					out_c.append(col)
	var arrays = []
	arrays.resize(Mesh.ARRAY_MAX)
	arrays[Mesh.ARRAY_VERTEX] = out_v
	arrays[Mesh.ARRAY_NORMAL] = out_n
	arrays[Mesh.ARRAY_COLOR] = out_c
	var am = ArrayMesh.new()
	if out_v.size() > 0:
		am.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)
		var mat = StandardMaterial3D.new()
		mat.vertex_color_use_as_albedo = true
		mat.roughness = 0.4
		am.surface_set_material(0, mat)
	return am

func _setup_hud_canvas() -> void:
	var layer = CanvasLayer.new()
	add_child(layer)
	hud_canvas = Control.new()
	hud_canvas.set_anchors_preset(Control.PRESET_FULL_RECT)
	hud_canvas.draw.connect(_on_hud_draw)
	layer.add_child(hud_canvas)

func _process(delta: float) -> void:
	time_accum += delta
	recoil_bloom = lerpf(recoil_bloom, 0.0, delta * 8.0)
	if camera_3d:
		camera_3d.position.x = 0.32 + mouse_norm.x * 0.18
		camera_3d.position.y = 0.76 - mouse_norm.y * 0.12 + sin(time_accum * 2.2) * 0.012
		camera_3d.look_at(Vector3(-0.08 - mouse_norm.x * 0.4, 0.68 - mouse_norm.y * 0.3, 4.0), Vector3.UP)
	if hud_canvas:
		hud_canvas.queue_redraw()

func _on_hud_draw() -> void:
	var vp = hud_canvas.get_viewport_rect().size
	var g = GLYPHS[current_platform]
	var font = ThemeDB.fallback_font

	# Barra Superior de Status: Star Marshal · Vespera-9
	hud_canvas.draw_rect(Rect2(24, 18, 520, 36), Color(0.05, 0.16, 0.22, 0.88), true)
	hud_canvas.draw_rect(Rect2(24, 18, 520, 36), Color("#F4A922"), false, 2.0)
	var state_names = ["[1] EXPLORAÇÃO (90% OCULTO)", "[2] COMBATE ATIVO", "[3] ESTADO CRÍTICO (<15%)"]
	hud_canvas.draw_string(font, Vector2(38, 42), "STAR MARSHAL // VESPERA-9 · " + state_names[current_state], HORIZONTAL_ALIGNMENT_LEFT, -1, 15, Color("#F2E6CE"))

	if current_state == HudState.EXPLORATION and not wheel_open:
		hud_canvas.draw_string(font, Vector2(vp.x * 0.5 - 140, vp.y - 42), "[" + g["interact"] + "] INVESTIGAR EVIDÊNCIA · [" + g["scanner"] + "] SCANNER DE PULSO", HORIZONTAL_ALIGNMENT_LEFT, -1, 15, Color("#2CC5C9"))
		return

	# Estado de Combate & Crítico: Escudo (Canto Inferior Esquerdo) e Munição Raio MK-II (Direito)
	var is_crit = (current_state == HudState.CRITICAL)
	var accent_col = Color("#E63926") if is_crit else Color("#2CC5C9")
	if is_crit:
		var pulse_a = 0.22 + 0.18 * sin(time_accum * 7.0)
		hud_canvas.draw_rect(Rect2(0, 0, vp.x, vp.y), Color(0.90, 0.12, 0.10, pulse_a), true)
		hud_canvas.draw_rect(Rect2(vp.x * 0.5 - 150, 72, 300, 40), Color("#E63926"), true)
		hud_canvas.draw_string(font, Vector2(vp.x * 0.5 - 115, 98), "INTEGRIDADE CRÍTICA", HORIZONTAL_ALIGNMENT_LEFT, -1, 18, Color("#F2E6CE"))

	# Painel de Escudo Segmentado Anos 60
	var sh_rect = Rect2(36, vp.y - 110, 340, 72)
	hud_canvas.draw_rect(sh_rect, Color(0.04, 0.14, 0.19, 0.92), true)
	hud_canvas.draw_rect(sh_rect, accent_col, false, 2.5)
	hud_canvas.draw_string(font, Vector2(52, vp.y - 82), "ESCUDO SOLAR // " + str(int(shield_pct)) + "%", HORIZONTAL_ALIGNMENT_LEFT, -1, 15, Color("#F2E6CE"))
	var seg_colors = [Color("#2CC5C9"), Color("#52B788"), Color("#F4A922"), Color("#E63926")]
	var active_segs = int(ceil((shield_pct / 100.0) * 4.0))
	for i in range(4):
		var seg_r = Rect2(52 + i * 74, vp.y - 68, 66, 18)
		hud_canvas.draw_rect(seg_r, seg_colors[i] if i < active_segs else Color(0.1, 0.2, 0.25, 0.5), true)

	# Painel Direita: Pistola de Raios MK-II Munição
	var am_rect = Rect2(vp.x - 280, vp.y - 110, 244, 72)
	hud_canvas.draw_rect(am_rect, Color(0.04, 0.14, 0.19, 0.92), true)
	hud_canvas.draw_rect(am_rect, accent_col, false, 2.5)
	hud_canvas.draw_string(font, Vector2(vp.x - 260, vp.y - 82), "RAIO MK-II [" + g["reload"] + " RECARGA]", HORIZONTAL_ALIGNMENT_LEFT, -1, 14, Color("#F4A922"))
	hud_canvas.draw_string(font, Vector2(vp.x - 260, vp.y - 50), "%03d" % ammo_mag, HORIZONTAL_ALIGNMENT_LEFT, -1, 28, Color("#E63926") if is_crit else Color("#F2E6CE"))

	# Mira Dinâmica Central
	var center = vp * 0.5
	var rad = 18.0 + recoil_bloom
	hud_canvas.draw_arc(center, rad, 0, TAU, 48, accent_col, 2.0)
	hud_canvas.draw_circle(center, 3.0, Color("#F4A922"))

	# Roda de Armas Spectra-7 (Bullet-Time)
	if wheel_open:
		hud_canvas.draw_rect(Rect2(0, 0, vp.x, vp.y), Color(0.02, 0.08, 0.12, 0.78), true)
		hud_canvas.draw_arc(center, 190.0, 0, TAU, 64, Color("#F2E6CE"), 3.0)
		hud_canvas.draw_circle(center, 82.0, Color("#0D3B49"))
		hud_canvas.draw_arc(center, 82.0, 0, TAU, 48, Color("#F4A922"), 2.5)
		var wpn = WEAPONS[hovered_weapon_idx]
		hud_canvas.draw_string(font, center + Vector2(-70, -8), wpn["name"], HORIZONTAL_ALIGNMENT_LEFT, -1, 13, Color("#F2E6CE"))
		hud_canvas.draw_string(font, center + Vector2(-24, 24), str(wpn["ammo"]), HORIZONTAL_ALIGNMENT_LEFT, -1, 24, Color("#F4A922"))

func set_hud_state(new_state: HudState) -> void:
	current_state = new_state
	match current_state:
		HudState.EXPLORATION:
			shield_pct = 100.0
			ammo_mag = 24
		HudState.COMBAT:
			shield_pct = 78.0
			ammo_mag = 24
		HudState.CRITICAL:
			shield_pct = 12.0
			ammo_mag = 6

func set_platform_glyphs(plat: Platform) -> void:
	current_platform = plat

func toggle_weapon_wheel(open: bool) -> void:
	wheel_open = open
	Engine.time_scale = 0.10 if wheel_open else 1.0

func _input(event: InputEvent) -> void:
	if event is InputEventMouseMotion:
		var vp = get_viewport().get_visible_rect().size
		if vp.x > 0 and vp.y > 0:
			mouse_norm = (event.position / vp) * 2.0 - Vector2.ONE
	elif event is InputEventJoypadButton or event is InputEventJoypadMotion:
		set_platform_glyphs(Platform.PLAYSTATION)
	elif event is InputEventKey and event.pressed:
		set_platform_glyphs(Platform.PC)
		match event.keycode:
			KEY_1: set_hud_state(HudState.EXPLORATION)
			KEY_2: set_hud_state(HudState.COMBAT)
			KEY_3: set_hud_state(HudState.CRITICAL)
			KEY_TAB: toggle_weapon_wheel(!wheel_open)
			KEY_R: ammo_mag = ammo_max
			KEY_V: scanner_active = !scanner_active
	elif event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		if not wheel_open and ammo_mag > 0:
			ammo_mag -= 1
			recoil_bloom = 18.0
			if current_state == HudState.EXPLORATION:
				set_hud_state(HudState.COMBAT)
