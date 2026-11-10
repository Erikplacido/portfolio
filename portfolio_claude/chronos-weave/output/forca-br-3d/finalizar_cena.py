import bpy,os,sys
ROOT=os.path.dirname(os.path.abspath(__file__))
s=bpy.context.scene
s.view_settings.exposure=-.65
s.view_settings.look='AgX - Medium High Contrast'
for m in bpy.data.materials:
 if m.name.startswith('Arte original'):
  p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Specular IOR Level'].default_value=.12;p.inputs['Roughness'].default_value=.62
s.camera.location=(5,-13,14.8)
from mathutils import Vector
s.camera.rotation_euler=(Vector((0,-.15,0))-s.camera.location).to_track_quat('-Z','Y').to_euler()
s.camera.data.ortho_scale=15.8
s.cycles.samples=40
s.render.filepath=os.path.join(ROOT,'preview-refinada.png')
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'forca-br-estudio.blend'))
bpy.ops.render.render(write_still=True)
