import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { PG_CONNECTION } from '../../constants';
import { Gender, Role, User } from '../../models/user.model';
import { HttpException, HttpStatus } from '@nestjs/common';

export class dbConnectionMock {
  query = jest.fn();
}

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PG_CONNECTION,
          useClass: dbConnectionMock,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const user: User = {
        firstName: 'testfirstname',
        lastName: 'testlastname',
        dob: new Date(),
        password: 'testpassword',
        email: 'test@mail.com',
        gender: Gender.Female,
        role: Role.Artist,
        phone: '1234567890',
        address: 'testaddress',
      };

      // Mock the query for checking existing email
      (userService as any).dbConnection.query.mockResolvedValueOnce({
        rowCount: 0,
        rows: [],
      });

      // Mock the query for inserting the user
      (userService as any).dbConnection.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            first_name: user.firstName,
            last_name: user.lastName,
            dob: user.dob,
            password: user.password,
            email: user.email,
            gender: user.gender,
            role: user.role,
            phone: user.phone,
            address: user.address,
          },
        ],
      });

      const createdUser = await userService.createUser(user);

      const { password, ...userWithoutPassword } = user;

      expect(createdUser).toEqual({
        id: 1,
        ...userWithoutPassword,
      });
    });

    it('should not create an user if the email already exists', async () => {
      const user: User = {
        firstName: 'testfirstname',
        lastName: 'testlastname',
        dob: new Date(),
        password: 'testpassword',
        email: 'test@mail.com',
        gender: Gender.Female,
        role: Role.Artist,
        phone: '1234567890',
        address: 'testaddress',
      };

      // Mock the query for checking existing email
      (userService as any).dbConnection.query.mockResolvedValueOnce({
        rowCount: 1,
      });

      // expect createUser method to throw an HttpException
      await expect(userService.createUser(user)).rejects.toThrow(
        new HttpException(
          'user with email already exists',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
