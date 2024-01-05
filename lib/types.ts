export type UserProfile = {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isCoach: boolean;
    isWebmaster: boolean;
    isVerified: boolean;
    isBanned: boolean;
    isSubscriber: boolean;
    avatarPath: string;
}

export type RegistrationData = {
    email: string | undefined;
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    password: string | undefined;
};

export type LoginInputData = {
    emailOrUsername: string | undefined;
    password: string | undefined;
};

export type LoginDatabaseData = {
    id: string;
    passwordHash: string;
};


export type WeightLossProfile = {
    heightInCentimeters: number;
    startingWeightInGrams: number;
    currentWeightInGrams: number;
    targetWeightInGrams: number;
    activityLevel: number;
    sex: string | undefined;
    age: number | undefined;
    weightLossPhotos: WeightLossPhotos[];
    weightLossHistory: WeightLossHistory[];
};

export type WeightLossPhotos = {
    photoPath: string;
    date: Date;
};

export type WeightLossHistory = {
    date: Date;
    weightInGrams: number;
};

export type DietaryRestrictions = {
    dairy: boolean;
    eggs: boolean;
    fish: boolean;
    gluten: boolean;
    peanuts: boolean;
    shellfish: boolean;
    soy: boolean;
    treeNuts: boolean;
    wheat: boolean;
    redMeat: boolean;
    vegetarian: boolean;
    vegan: boolean;
    pescatarian: boolean;
    paleo: boolean;
    keto: boolean;
    kosher: boolean;
    halal: boolean;
};