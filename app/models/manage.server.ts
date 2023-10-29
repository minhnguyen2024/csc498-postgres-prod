import { prisma } from "~/db.server";

export type Feature = {
    id: number;
    featureName: string;
    enabled: number;
};
export async function selectAllReserved(): Promise<object[]>{
    return await prisma.$queryRaw`SELECT Block.id AS blockId, Block.room_id AS roomId, Block.booked_user_id AS userId, User.username, Block.time FROM Block, Room , User 
    WHERE Block.room_id = Room.id 
    AND Block.booked_user_id = User.id
    AND Block.booked_user_id != 0`
}

export async function toggleFeature(): Promise<Feature[]>{
    return await prisma.$queryRaw`SELECT * From Feature`
}

export async function getFeatureByName(featureName: string): Promise<Feature[]>{
    return await prisma.$queryRaw`SELECT * From Feature WHERE featureName = ${featureName}`
}

export async function updateFeatureByName({featureName, featureStatus}:{featureName: string, featureStatus: string}) {
    if (featureStatus == "1"){
        return await prisma.$executeRaw`UPDATE Feature SET enabled = 0 WHERE featureName = ${featureName}`
    }
    else{
        return await prisma.$executeRaw`UPDATE Feature SET enabled = 1 WHERE featureName = ${featureName}`
    }
}