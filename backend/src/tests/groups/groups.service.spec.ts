import { Test } from '@nestjs/testing';
import { GroupsService } from 'src/groups/groups.service';
import { prismaMock } from '../prisma-mock';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GroupsService],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should list all groups', async () => {
      prismaMock.group.findMany.mockResolvedValue([
        {
          name: 'group1',
          description: 'description1',
          creator_uuid: '02',
          created_at: new Date(),
          deleted_at: null,
          image_url: '',
          updated_at: new Date(),
          uuid: '01',
        },
      ]);

      const groups = await service.findAll();

      console.log(groups);
    });
  });
});
