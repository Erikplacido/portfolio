import bpy,os
ROOT=os.path.dirname(os.path.abspath(__file__))
s=bpy.context.scene
s.render.resolution_x=3840;s.render.resolution_y=2160;s.render.resolution_percentage=100
s.cycles.samples=128
s.render.filepath=os.path.join(ROOT,'forca-br-mockup-4k.png')
bpy.ops.file.pack_all()
# Open the editable project with a useful camera view.
for screen in bpy.data.screens:
 for area in screen.areas:
  if area.type=='VIEW_3D':area.spaces.active.region_3d.view_perspective='CAMERA'
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'forca-br-estudio.blend'))
bpy.ops.render.render(write_still=True)
