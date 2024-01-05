'use client';

import Image from 'next/image'

export default function ProfileCard(props: any) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-1 border-2 border-solid">
                <Image 
                    src={props.avatarPath} 
                    alt="Card image cap" 
                    width={100} 
                    height={100} 
                />
            </div>
            <div className="col-6">
            <div className="card">
                <h1 className="display-4">Hello, {props.username}!</h1>
            </div>
            </div>
            </div>
        </div>
    )
}