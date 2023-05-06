import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  idUser: number;

  @Column('varchar', { length: 255, nullable: false })
  userName: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: 255, nullable: false })
  senha: string;
}
