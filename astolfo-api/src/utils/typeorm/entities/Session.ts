import { ISession } from 'connect-typeorm';
import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity()
export default class Session implements ISession {
  @Index()
  @Column('bigint')
  expiredAt: number;

  @PrimaryColumn('varchar', { length: 255 })
  id = '';

  @Column('text')
  json = '';
}
