import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

export abstract class EntityWithTimestamps {
  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP()', nullable: false })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
    nullable: false,
  })
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}