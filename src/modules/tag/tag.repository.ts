import { EntityRepository, Repository } from 'typeorm';
import CreateTagDTO from './dto/create-tag.dto';
import GetFiltersTagsDTO from './dto/get-filters-tag.dto';
import Tag from './tag.entity';

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
    
    async createTag(createTagDTO:CreateTagDTO){
        const tag = new Tag();
        const { description } = createTagDTO;
        tag.description = description;
        try {
            await tag.save();
            return tag;
        } catch (error) {
            throw error;
        }
    }

    async getTags(getFiltersTagsDTO:GetFiltersTagsDTO){
        let {page, limit, search} = getFiltersTagsDTO;
        if(!page)page=1;if(!limit)limit=20;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder('entrepreneurship')
                    .orderBy('description','ASC')
                    .offset(skip)
                    .limit(limit);
        if(search) query.andWhere('description like :search',{search:`%${search}%`});
        const tags = await query.getManyAndCount();
        return {
            total:tags[1],
            page,
            limit,
            data:tags[0]
        };
    }
}