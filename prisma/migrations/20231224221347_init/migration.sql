-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastVisitDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isCoach" BOOLEAN NOT NULL DEFAULT false,
    "isWebmaster" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "isSubscriber" BOOLEAN NOT NULL DEFAULT false,
    "avatarPath" TEXT NOT NULL DEFAULT 'public/defaultAvatar.svg',
    "aboutMe" TEXT NOT NULL DEFAULT '',
    "profileVisibility" TEXT NOT NULL DEFAULT 'public'
);

-- CreateTable
CREATE TABLE "WeightLossProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "heightInCentimeters" INTEGER NOT NULL,
    "startingWeightInGrams" INTEGER NOT NULL,
    "currentWeightInGrams" INTEGER NOT NULL,
    "targetWeightInGrams" INTEGER NOT NULL,
    CONSTRAINT "WeightLossProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeightLossPhotos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "photoPath" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WeightLossPhotos_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "WeightLossProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeightLossHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weightInGrams" INTEGER NOT NULL,
    CONSTRAINT "WeightLossHistory_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "WeightLossProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dietaryRestrictions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "dairy" BOOLEAN NOT NULL DEFAULT false,
    "eggs" BOOLEAN NOT NULL DEFAULT false,
    "fish" BOOLEAN NOT NULL DEFAULT false,
    "gluten" BOOLEAN NOT NULL DEFAULT false,
    "peanuts" BOOLEAN NOT NULL DEFAULT false,
    "shellfish" BOOLEAN NOT NULL DEFAULT false,
    "soy" BOOLEAN NOT NULL DEFAULT false,
    "treeNuts" BOOLEAN NOT NULL DEFAULT false,
    "wheat" BOOLEAN NOT NULL DEFAULT false,
    "redMeat" BOOLEAN NOT NULL DEFAULT false,
    "vegetarian" BOOLEAN NOT NULL DEFAULT false,
    "vegan" BOOLEAN NOT NULL DEFAULT false,
    "pescatarian" BOOLEAN NOT NULL DEFAULT false,
    "paleo" BOOLEAN NOT NULL DEFAULT false,
    "keto" BOOLEAN NOT NULL DEFAULT false,
    "kosher" BOOLEAN NOT NULL DEFAULT false,
    "halal" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "dietaryRestrictions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WeightLossProfile_userId_key" ON "WeightLossProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WeightLossPhotos_profileId_key" ON "WeightLossPhotos"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "WeightLossHistory_profileId_key" ON "WeightLossHistory"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "dietaryRestrictions_userId_key" ON "dietaryRestrictions"("userId");
