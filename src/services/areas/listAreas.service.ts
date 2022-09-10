import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { AppError } from "../../error/global";
import { Posts } from "../../entities/Posts.entity";

interface IAreaOrg {
  id: string;
  name: string;
  description: string;
  meetings: Meetings[];
  posts: Posts[];
}

const listAreasService = async (organization: string): Promise<IAreaOrg[]> => {
  console.log("aqui org", organization);

  const areasRepository = AppDataSource.getRepository(Areas);
  let areas: Areas[];
  try {
    areas = await areasRepository.find({
      where: { organization: { id: organization } },
    });
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  const a = areas.map((area: Areas) => {
    const { organization, ...rest } = area;
    return rest;
  });
  return a;
};

export default listAreasService;
