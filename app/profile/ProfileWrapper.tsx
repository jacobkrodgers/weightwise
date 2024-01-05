import { redirect } from 'next/navigation';
import ProfileCard from './ProfileCard';
import { getUser } from './actions';

export default async function ProfileWrapper() {

    const userResponse = await getUser();
    const userProfile = await userResponse.json();

    if (userProfile!.isBanned) {
        return (
            <div className="container">
                <h1>Your account has banned.</h1>
            </div>
        )
    }
    else{
        return (
            <div className="container">
                <ProfileCard avatarPath={userProfile!.avatarPath} username={userProfile!.username} />
            </div>
        )
    }
}
