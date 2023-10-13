import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";
import { events } from "@react-three/fiber";
export function Ground (){
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.50, 0]

    }))

    const [addCube] = useStore(state => [state.addCube])
    groundTexture.repeat.set(100,100)

    const handleClickGround = events=> {
        events.stopPropagation()
        const [x, y, z] =Object.values(events.point)
            .map(n => Math.ceil(n))
        addCube(x, y, z)
    }

    return (
        <mesh ref={ref}
        onClick={handleClickGround}>
            
            <planeBufferGeometry attach="geometry" args={[100,100]}/>
            <meshStandardMaterial attach="material" map={groundTexture}/>
        </mesh>
    )
}