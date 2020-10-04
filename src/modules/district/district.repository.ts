import { Repository,EntityRepository } from 'typeorm';
import District from './district.entity';
import GetFiltersDistrictsDTO from './dto/get-filters-disctricts.dto';

@EntityRepository(District)
export default class DistrictRepository extends Repository<District> {
    async getDistricts(getFiltersDistrictsDTO:GetFiltersDistrictsDTO){
        let {page, limit, search} = getFiltersDistrictsDTO;
        if(!page)page=1;if(!limit)limit=20;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder('district')
                    .orderBy('district','ASC')
                    .offset(skip)
                    .limit(limit);
        if(search) query.andWhere('district like :search',{search:`%${search}%`});
        const districts = await query.getManyAndCount();
        return {
            total:districts[1],
            page,
            limit,
            data:districts[0]
        };
    }
}