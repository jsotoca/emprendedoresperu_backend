import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import Entrepreneurship from '../entrepreneurship/entrepreneurship.entity';
import Deal from './deal.entity';
import CreateDealDTO from './dto/create-deal.dto';
import GetFiltersDealDTO from './dto/get-filters-deal.dto';
@EntityRepository(Deal)
export default class DealRepository extends Repository<Deal> {

    async createDeal(
        createDealDTO:CreateDealDTO,
        entrepreneurship:Entrepreneurship
    ){
        const deal = new Deal();
        for(let field in createDealDTO) deal[field] = createDealDTO[field];
        deal.entrepreneurship = entrepreneurship;
        try {
            await deal.save();
            return deal;
        } catch (error) {
            throw error;
        }
    }

    async getDeals(getFiltersDealDTO:GetFiltersDealDTO){
        let {page, limit, search} = getFiltersDealDTO;
        if(!page)page=1;if(!limit)limit=5;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder('deal')
                    .orderBy('created_at','DESC')
                    .offset(skip)
                    .limit(limit);
        if(search) query.andWhere('name like :search OR description like :search',{search:`%${search}%`});
        const deals = await query.getManyAndCount();
        return {
            total:deals[1],
            page,
            limit,
            data:deals[0]
        };
    }
    
}