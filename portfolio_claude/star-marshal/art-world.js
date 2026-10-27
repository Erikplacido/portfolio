/* Art-directed spaceport geometry; all elements remain part of the live 3D scene. */
function buildArtDirectedPort() {
    const cream = new THREE.MeshToonMaterial({color:0xf2dfad});
    const red = new THREE.MeshToonMaterial({color:0xd33c24});
    const teal = new THREE.MeshToonMaterial({color:0x174c57});
    const gold = new THREE.MeshToonMaterial({color:0xe8ab47});
    function mesh(geometry, material, x,y,z, parent=scene){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);addInkOutline(m, .012);return m;}
    function tower(x,z,h,r){
        const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
        mesh(new THREE.CylinderGeometry(r*.64,r,h,12),cream,0,h/2,0,g);
        for(let i=0;i<6;i++){
            const a=i*Math.PI/3;
            const fin=mesh(new THREE.BoxGeometry(.09,h*.82,.12),teal,Math.cos(a)*r*.78,h*.48,Math.sin(a)*r*.78,g);fin.rotation.y=-a;
        }
        mesh(new THREE.CylinderGeometry(r*.7,r*.7,.22,24),red,0,h*.86,0,g);
        mesh(new THREE.CylinderGeometry(.06,.13,h*.4,8),gold,0,h*1.18,0,g);
        mesh(new THREE.SphereGeometry(r*.65,16,8,0,Math.PI*2,0,Math.PI/2),gold,0,h,0,g);
    }
    [[-8,18,9,.75],[-5,24,11,.5],[-3,28,13,.48],[3,25,12,.55],[6,18,8,.65],[9,24,13,.8],[-11,30,15,.7],[1,30,16,.55]].forEach(a=>tower(...a));
    // Cantilevered circular terminals and their red ribbon facades.
    for(const [x,z,y,r] of [[-7,11,3.8,3.1],[7,14,5.5,3.6]]){
        mesh(new THREE.CylinderGeometry(.3,.5,y,16),teal,x,y/2,z);
        mesh(new THREE.CylinderGeometry(r*.9,r,.34,48),cream,x,y,z);
        mesh(new THREE.CylinderGeometry(r*.9,r*.9,.15,48),red,x,y+.22,z);
        mesh(new THREE.SphereGeometry(r*.6,32,12,0,Math.PI*2,0,Math.PI/2),cream,x,y+.3,z);
        const ring=mesh(new THREE.TorusGeometry(r,.055,6,64),gold,x,y-.2,z);ring.rotation.x=Math.PI/2;
    }
    // Runway markings, expansion joints and cargo supply scale without an editor grid.
    for(let z=2;z<30;z+=3){mesh(new THREE.BoxGeometry(.06,.006,1.5),gold,-2,.014,z);mesh(new THREE.BoxGeometry(.06,.006,1.5),gold,2,.014,z);}
    for(let z=1;z<30;z+=4)mesh(new THREE.BoxGeometry(28,.008,.025),teal,0,.008,z);
    for(const [x,z] of [[-4,6],[4,8],[-5,10],[5,11]]){
        mesh(new THREE.BoxGeometry(.65,.7,.65),cream,x,.35,z);
        mesh(new THREE.BoxGeometry(.68,.1,.68),red,x,.5,z);
    }
    // Parked courier rocket, echoing the cream-and-crimson spacecraft in the board.
    const rocket = new THREE.Group(); rocket.position.set(-3.8,.85,5.5); rocket.rotation.y=-.25;scene.add(rocket);
    const hull=mesh(new THREE.CylinderGeometry(.42,.55,3.6,24),cream,0,0,0,rocket);hull.rotation.x=Math.PI/2;
    const stripe=mesh(new THREE.CylinderGeometry(.46,.48,.5,24),red,0,0,-.6,rocket);stripe.rotation.x=Math.PI/2;
    const nose=mesh(new THREE.ConeGeometry(.42,1.1,24),red,0,0,-2.3,rocket);nose.rotation.x=-Math.PI/2;
    const glass=mesh(new THREE.SphereGeometry(.39,20,12),teal,0,.22,-1,rocket);glass.scale.set(.8,.6,1.8);
    for(const side of [-1,1]){
        const fin=mesh(new THREE.BoxGeometry(.95,.06,1.4),red,side*.65,-.14,.9,rocket);fin.rotation.z=side*.2;
        mesh(new THREE.BoxGeometry(.08,.6,.1),teal,side*.45,-.65,.6,rocket);
    }
    // Deterministic star field in the upper sky.
    const positions=[];
    for(let i=0;i<100;i++){positions.push(Math.sin(i*127.1)*65,12+(Math.sin(i*31.7)+1)*22,65+Math.cos(i*19.3)*8);}
    const stars=new THREE.BufferGeometry();stars.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    scene.add(new THREE.Points(stars,new THREE.PointsMaterial({color:0xffe6a9,size:.12,sizeAttenuation:true,fog:false})));
    // Graphic planet surface markings, with no bitmap backdrop.
    for(let i=0;i<20;i++){
        const phi=.35+(i%5)*.5,theta=i*2.4;
        const crater=mesh(new THREE.SphereGeometry(.18+(i%3)*.12,10,8),red,0,0,0,planetGroup);
        crater.position.set(6.21*Math.sin(phi)*Math.cos(theta),6.21*Math.cos(phi),6.21*Math.sin(phi)*Math.sin(theta));
        crater.scale.set(1,.6,.3);
    }
}
