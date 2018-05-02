function chart_ld (width, height,
                   generations, min_val, max_val,
                   chrom_observations) {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        35, window.innerWidth / window.innerHeight, 0.1, 1000)

    const controls = new THREE.OrbitControls(camera)
    controls.target.set(8, 0, 8)
    camera.position.set(8, 30, 8)
    controls.update()

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)


    const y_geom = new THREE.BoxGeometry(0.1, 9, 0.1)
    const y_mat = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const y_axis = new THREE.Mesh(y_geom, y_mat)
    y_axis.position.y = 4.5
    scene.add(y_axis)

    const x_geom = new THREE.BoxGeometry(16, 0.1, 0.1)
    const x_mat = new THREE.MeshBasicMaterial({color: 0x0000ff})
    const x_axis = new THREE.Mesh(x_geom, x_mat)
    x_axis.position.x = 8
    scene.add(x_axis)

    const z_geom = new THREE.BoxGeometry(0.1, 0.1, 9)
    const z_mat = new THREE.MeshBasicMaterial({color: 0xff0000})
    const z_axis = new THREE.Mesh(z_geom, z_mat)
    z_axis.position.z = 4.5
    scene.add(z_axis)


    const center_geom = new THREE.SphereGeometry(0.1, 32, 32)
    const center_mat = new THREE.MeshBasicMaterial({color: 0xffff00})
    const center = new THREE.Mesh(center_geom, center_mat)
    scene.add(center)


    const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
    }

    animate()

    const chrom_size = Math.max(
	Object.keys(chrom_observations).map(x => parseInt(x)))
    return {scene, camera, controls,
	    chrom_observations, generations,
	    val_abs_max: Math.max(Math.abs(min_val), Math.abs(max_val)),
	    chrom_size, generation: 0}
}


function add_observations(chart, chrom_observations) {
    const dx = 16 / chart.generations
    const dy = 9 / chart.val_abs_max
    const dz = 9 / chart.chrom_size
    for (var chrom_pos of chrom_observations) {
        const obs_geom = new THREE.Geometry()
        obs_geom.vertices.push(
	    new THREE.Vector3(
		dx*chart.generation,
		XX,
		dz * chrom_pos),
	    new THREE.Vector3(
		dx*(chart.generation+1),
		YY,
		dz * chrom_pos))
        const obs_mat = new THREE.MeshBasicMaterial({color: 0xffffff})
        const obs_line = new THREE.Line(obs_geom, obs_mat)
        scene.add(obs_line)
    }
    chart.chrom_observations = chrom_observations
    chart.generation += 1
}


const chart = chart_ld(window.innerWidth, window.innerHeight,
		       10, -1, 1, {0: 1, 10: 0.5, 100: 0})

//add_observations(chart, {0: 1, 10: 0, 100: 1})
