import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column()
    price: number;

    @Column()
    model: string;

    @Column()
    color: string;

    @Column({ name: 'user_id' })
    userId: number;
  
    @ManyToOne(() => User, {onDelete: "CASCADE", cascade: ['soft-remove', 'remove']})
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    // @Column()
    // sellerId: string; // ForeinKey?!

    // Hookes: happend after certain acton in databse
    // NOTICE: THESE HOOKS WON'T RUN: BECAUSE OF DIRECTLY USING SAVE ON THE OBJECT
    // KEEP THat in mind
    @AfterInsert()
    afterInsert() {
      console.log('This Report object has been INSERTED: ', this);
        
    }

    @AfterUpdate()
    afterUpdate() {
        console.log('This Report object has been UPDATED: ', this);
    
    }
    
    @AfterRemove()
    logAfterRemove() {
      console.log('This Report object has been REMOVED: ', this);
    }

    @DeleteDateColumn({
      name: 'deleted_at',
      type: 'datetime',
      default: null,
    })
    deletedAt: Date;
    
}
