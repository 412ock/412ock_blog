'use client'

// modules
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function Main(){
    return (
        <div className='h-[80vh]'>
            <Canvas>
                
                <pointLight position={[0, 0, -5]} />
                <Box position={[-3.6, 0, 3]} />
                <Box position={[-1.2, 0, 3]} />
                <Box position={[1.2, 0, 3]} />
                <Box position={[3.6, 0, 3]} />
                
                <Box position={[-8.4, -2.4 ,0]} />
                <Box position={[-6.0, -2.4 ,0]} />
                <Box position={[-3.6, -2.4 ,0]} />
                <Box position={[-1.2, -2.4 ,0]} />
                <Box position={[1.2, -2.4 ,0]} />
                <Box position={[3.6, -2.4 ,0]} />
                <Box position={[6, -2.4 ,0]} />
                <Box position={[8.4, -2.4 ,0]} />

                <Box position={[-8.4, 2.4 ,0]} />
                <Box position={[-6.0, 2.4 ,0]} />
                <Box position={[-3.6, 2.4 ,0]} />
                <Box position={[-1.2, 2.4 ,0]} />
                <Box position={[1.2, 2.4 ,0]} />
                <Box position={[3.6, 2.4 ,0]} />
                <Box position={[6, 2.4 ,0]} />
                <Box position={[8.4, 2.4 ,0]} />

                <Box position={[-6.0, 0 ,0]} />
                <Box position={[-3.6, 0 ,0]} />
                <Box position={[-1.2, 0 ,0]} />
                <Box position={[1.2, 0 ,0]} />
                <Box position={[3.6, 0 ,0]} />
                <Box position={[6.0, 0 ,0]} />
                <Box position={[8.4, 0 ,0]} />
            </Canvas>
        </div>
    )
}

function Box(props: any){
    const ref = useRef<Mesh>(null!);
    
    useFrame((state, delta)=>{
        ref.current.rotation.x += delta * Math.random();
        ref.current.rotation.y += delta * Math.random();
    })

    return (
        <mesh
            {...props}
            ref={ref}
            scale = {1}
        >    
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial color='white' />
        </mesh>
    )
}