import { EntityRepository, Repository } from 'typeorm';
import Tag from './tag.entity';

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
    
}