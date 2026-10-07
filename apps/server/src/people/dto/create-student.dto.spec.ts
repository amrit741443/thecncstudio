import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateStudentDto } from './create-student.dto.js';

describe('CreateStudentDto', () => {
  it('validates a complete student payload', async () => {
    const dto = plainToInstance(CreateStudentDto, {
      studentCode: 'CNC-001',
      firstName: 'Asha',
      lastName: 'Shrestha',
      dateOfBirth: '2018-01-01',
      gender: 'female',
      status: 'active',
    });

    expect(await validate(dto)).toEqual([]);
  });

  it('rejects an invalid student code', async () => {
    const dto = plainToInstance(CreateStudentDto, {
      studentCode: '',
      firstName: 'Asha',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toMatchObject({
      isNotEmpty: expect.any(String),
    });
  });
});
