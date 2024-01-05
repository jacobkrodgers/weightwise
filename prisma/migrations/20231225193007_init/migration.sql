/*
  Warnings:

  - You are about to drop the column `sex` on the `User` table. All the data in the column will be lost.
  - Added the required column `activityLevel` to the `WeightLossProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `WeightLossProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `WeightLossProfile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeightLossProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "heightInCentimeters" INTEGER NOT NULL,
    "startingWeightInGrams" INTEGER NOT NULL,
    "currentWeightInGrams" INTEGER NOT NULL,
    "targetWeightInGrams" INTEGER NOT NULL,
    "activityLevel" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    CONSTRAINT "WeightLossProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WeightLossProfile" ("currentWeightInGrams", "heightInCentimeters", "id", "startingWeightInGrams", "targetWeightInGrams", "userId") SELECT "currentWeightInGrams", "heightInCentimeters", "id", "startingWeightInGrams", "targetWeightInGrams", "userId" FROM "WeightLossProfile";
DROP TABLE "WeightLossProfile";
ALTER TABLE "new_WeightLossProfile" RENAME TO "WeightLossProfile";
CREATE UNIQUE INDEX "WeightLossProfile_userId_key" ON "WeightLossProfile"("userId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
INSERT INTO "new_User" ("aboutMe", "avatarPath", "email", "firstName", "id", "isAdmin", "isBanned", "isCoach", "isSubscriber", "isVerified", "isWebmaster", "joinDate", "lastName", "lastVisitDate", "password", "profileVisibility", "username") SELECT "aboutMe", "avatarPath", "email", "firstName", "id", "isAdmin", "isBanned", "isCoach", "isSubscriber", "isVerified", "isWebmaster", "joinDate", "lastName", "lastVisitDate", "password", "profileVisibility", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
