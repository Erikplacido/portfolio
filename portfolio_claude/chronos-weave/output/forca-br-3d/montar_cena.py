import bpy, math, os
from mathutils import Vector
ROOT=os.path.dirname(os.path.abspath(__file__))
TEX=os.path.join(ROOT,'textures')
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
for datablock in bpy.data.materials: bpy.data.materials.remove(datablock)
def solid(name,color,rough=.5):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough
 return m
edge=solid('Papel cartão — bordas',(0.055,.061,.066),.72)
white=solid('Bases brancas',(.83,.86,.88),.3)
red=solid('Bases vermelhas',(.65,.012,.022),.32)
floor=solid('Fundo azul grafite',(.018,.028,.043),.56)
materials={}
def artwork(tex):
 if tex in materials:return materials[tex]
 m=solid('Arte original | '+tex,(1,1,1),.48)
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Specular IOR Level'].default_value=.22
 t=m.node_tree.nodes.new('ShaderNodeTexImage');t.image=bpy.data.images.load(os.path.join(TEX,tex+'.png'),check_existing=True);t.interpolation='Linear'
 m.node_tree.links.new(t.outputs['Color'],p.inputs['Base Color']);materials[tex]=m;return m

def cube(name,loc,dim,mat,bevel=0):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=dim;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(mat)
 if bevel:
  mod=o.modifiers.new('Bordas suaves','BEVEL');mod.width=bevel;mod.segments=3
  o.modifiers.new('Normais','WEIGHTED_NORMAL')
 return o

def plane(name,verts,tex,uvs=None):
 mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],[(0,1,2,3)]);mesh.update();o=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(o);o.data.materials.append(artwork(tex));uv=mesh.uv_layers.new()
 for i,co in enumerate(uvs or [(0,0),(1,0),(1,1),(0,1)]):uv.data[i].uv=co
 return o

def tile(name,tex,x,y,w,h,z=.035,depth=.045,angle=0):
 o=cube(name+' | corpo',(x,y,z),(w,h,depth),edge,.012);o.rotation_euler.z=angle
 vs=[]
 for a,b in [(-w/2,-h/2),(w/2,-h/2),(w/2,h/2),(-w/2,h/2)]:vs.append((x+a*math.cos(angle)-b*math.sin(angle),y+a*math.sin(angle)+b*math.cos(angle),z+depth/2+.001))
 plane(name+' | impressão',vs,tex);return o

def stack(name,tex,x,y,w,h,n=6,angle=0,z=.025):
 for i in range(n):
  tile(name+f' {i+1}',tex,x,y,w,h,z+i*.008,.007,angle)

def standee(name,tex,x,y,base_z=0,enemy=False,angle=.20):
 r=.20;h=.10
 bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=r,depth=h,location=(x,y,base_z+h/2));o=bpy.context.object;o.name=name+' | base';o.data.materials.append(red if enemy else white)
 b=o.modifiers.new('Arredondamento','BEVEL');b.width=.018;b.segments=3;o.modifiers.new('Normais','WEIGHTED_NORMAL')
 for p in o.data.polygons:p.use_smooth=True
 w=.40;height=.61
 # Printed rectangular standee: original art, bottom assembly margin tucked into base.
 z0=base_z+.075
 o=cube(name+' | cartão',(x,y,z0+height/2),(w,.016,height),edge,.004);o.rotation_euler.z=angle
 points=[]
 for a,z in [(-w/2,z0),(w/2,z0),(w/2,z0+height),(-w/2,z0+height)]:points.append((x+a*math.cos(angle)+.009*math.sin(angle),y+a*math.sin(angle)-.009*math.cos(angle),z))
 plane(name+' | frente',points,tex,[(0,.16),(1,.16),(1,1),(0,1)])
 # Back uses the same source illustration, allowing camera changes.
 points2=[(a-.018*math.sin(angle),b+.018*math.cos(angle),c) for a,b,c in points]
 plane(name+' | verso',points2,tex,[(0,.16),(1,.16),(1,1),(0,1)])

tile('Tabuleiro — mapa do Brasil','decal',0,1.05,6.5,6.5,.065,.10)
tile('Painel central','decal2',0,-3.68,6.5,2.56,.045,.065)
# Six region decks fit the six marked areas of the original dashboard.
regions=['texture2540904','texture2546014','texture2550618','texture2554018','texture2556327','texture2559422']
for i,t in enumerate(regions):stack('Regiões '+str(i+1),t,-1.36+i*.72,-3.18,.49,.69,4,z=.085)
stack('Eventos','texture2572074',-2.65,-3.18,.91,.64,8,z=.085)
stack('Missões','texture2531949',-2.42,-4.06,.47,.66,7,z=.085)
# Character dashboards flank the board without covering the map.
for name,x,y,tex,ang in [('Ordem',-4.58,-1.30,'texture2879024',-.10),('Amanari',4.62,-1.05,'texture2892116',.10)]:
 tile('Painel de '+name,'decal12',x,y,2.22,1.64,.045,.06,ang)
 tile('Carta de '+name,tex,x+.39*math.cos(ang),y+.39*math.sin(ang),.90,1.20,.092,.012,ang)
stack('Região monitorada','decal3',-2.18,-.45,.47,.66,9,z=.12)
stack('Asseclas','texture2563475',2.38,.10,.47,.66,5,z=.12)
heroes=[('Amanari','decal_smart_src2'),('Ordem','texture2712776_smart_src'),('Guarani','mini_texture61826_smart_src'),('Muzenza','mini_texture59648_smart_src'),('Guardião','mini_texture68578_smart_src'),('Heroína','mini_texture54583_smart_src'),('Herói','mini_texture57898_smart_src'),('Pequeno herói','mini_texture52243_smart_src')]
enemies=[('Cristal','mini_texture101513_smart_src'),('Alado','mini_texture104980_smart_src'),('Armadura','mini_texture112319_smart_src'),('Vilã','mini_texture115199_smart_src'),('Mecânico','mini_texture117770_smart_src'),('Mago','mini_texture120843_smart_src')]
# Five figures on the map, other unique figures displayed beside it.
for i,(idx,x,y) in enumerate([(0,-.8,.10),(1,.55,-.70),(3,-1.15,1.65)]):standee(*heroes[idx],x,y,.12,False,.28)
for idx,x,y in [(0,1.18,2.30),(2,2.10,1.10)]:standee(*enemies[idx],x,y,.12,True,.28)
for j,idx in enumerate([2,4,5,6,7]):standee(*heroes[idx],-4.35+(j%2)*.70,1.0+(j//2)*.85,0,False,.28)
for j,idx in enumerate([1,3,4,5]):standee(*enemies[idx],4.00+(j%2)*.70,1.05+(j//2)*.90,0,True,.28)
# Two face-up original character cards provide readable original illustration in foreground.
tile('Carta Muzenza','texture2912978',-4.52,-3.30,.79,1.05,.024,.012,-.16)
tile('Carta Amanari','texture2943090',4.45,-3.20,.79,1.05,.024,.012,.12)
cube('Mesa de estúdio',(0,0,-.12),(200,200,.22),floor,.05)
def light(name,loc,power,size,color,target=(0,0,0)):
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.shape='DISK';o.data.size=size;o.data.color=color;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
light('Softbox principal',(-5,-4,11),2100,8,(1,.95,.88))
light('Preenchimento',(7,-1,8),1600,7,(.77,.87,1))
light('Luz de recorte',(-1,7,10),2400,6,(.84,.92,1))
bpy.ops.object.camera_add(location=(8,-13,16));cam=bpy.context.object;cam.name='Câmera comercial 16x9';target=Vector((0,-.05,0));cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=16.6;bpy.context.scene.camera=cam
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=40;scene.cycles.use_denoising=True
scene.world.color=(.16,.16,.16);scene.view_settings.view_transform='AgX';scene.view_settings.exposure=.65
scene.render.resolution_x=1920;scene.render.resolution_y=1080;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.filepath=os.path.join(ROOT,'preview.png')
# Bundle original texture data so the editable scene is self-contained.
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'forca-br-estudio.blend'))
bpy.ops.render.render(write_still=True)
