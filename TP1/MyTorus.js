/**
 * MyTorus
 * @constructor
 * @param scene - Reference to MyScene object
 * @param inner - Reference to MyScene object
 * @param outer - Reference to MyScene object
 * @param slices - Reference to MyScene object
 * @param loops - Reference to MyScene object
 */
class MyTorus extends CGFobject {
	constructor(scene, inner, outer, slices, loops) {
		super(scene);
        this.inner = inner;
        this.outer = outer;
        this.slices = slices;
        this.loops = loops;

		this.initBuffers();
	}
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

		var amplitude_increment = (2 * Math.PI) / this.loops;
        
        // BODY
		var angle = 0;
		let theta = 0;
		var theta_increment = (2 * Math.PI) / this.loops;
        for (var loop = 0; loop <= this.loops; loop++) {

            theta += theta_increment;
            for (var slice = 0; slice <= this.slices; slice++) {

                // Parametric equations of Torus
                let x = Math.cos(theta) * (this.outer + Math.cos(angle) * this.inner);
                let y = Math.sin(theta) * (this.outer + Math.cos(angle) * this.inner)
                let z = Math.sin(angle) * this.inner;

                // -- Base of Cylinder -- //
                this.vertices.push(x);
                this.vertices.push(y);
                this.vertices.push(z);

                // -- Normals -- //
                this.normals.push(x, y, z);

                /*
                // -- Texture Coordinates -- //
                /*  0 ----------- 1
                *  |
                *  |
                *  |
                *  |
                *  1
                *  To map a texture, each side will have 1/this.slices
                * */
               /*
                this.texCoords.push(1 - i / this.slices, 1);
                this.texCoords.push(1 - i / this.slices, 0);

                */
				angle += amplitude_increment;
            }
        }

        // -- Join vertices by slices, and then by loops. Same logic as cylinder
		for (let loop = 0; loop < this.loops; loop++) {
			for (let slice = 0; slice < this.slices; slice++) {
				var startVertice = this.slices * loop + loop;

                this.indices.push(startVertice + slice);
                this.indices.push(startVertice + slice + this.slices + 1);
                this.indices.push(startVertice + slice + 1);
               
                
                this.indices.push(startVertice + slice + 1);
                this.indices.push(startVertice + slice + this.slices + 1); 
                this.indices.push(startVertice + slice + this.slices + 2);
			}
		}
		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}