import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

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
}
