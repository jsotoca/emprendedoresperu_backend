import { EntityRepository, Repository } from "typeorm";
import User from "../user/user.entity";
import Ads from "./ads.entity";
import CreateAdsDTO from "./dto/create-ads.dto";
import GetFiltersAdsDTO from "./dto/get-filter-ads.dto";

@EntityRepository(Ads)
export default class AdsRepository extends Repository<Ads> {

    async createAds(
        createAdsDTO:CreateAdsDTO
    ){
        const ads = new Ads();
        for(let field in createAdsDTO) ads[field] = createAdsDTO[field];
        try {
            await ads.save();
            return ads;
        } catch (error) {
            throw error;
        }
    }

    async getAdss(getFiltersAdsDTO:GetFiltersAdsDTO){
        let {page, limit, search} = getFiltersAdsDTO;
        if(!page)page=1;if(!limit)limit=5;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder('ads')
                    .orderBy('ads.created_at','DESC')
                    .offset(skip)
                    .limit(limit);
        if(search) query.andWhere('ads.name like :search',{search:`%${search}%`});
        const adss = await query.getManyAndCount();
        return {
            total:adss[1],
            page,
            limit,
            data:adss[0]
        };
    }

}