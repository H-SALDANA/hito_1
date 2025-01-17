import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    IsEmail,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    Unique,
  } from "sequelize-typescript";
  
  @Table
  export class User extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    uid!: string;
  
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING)
    name!: string;
  
    @AllowNull(false)
    @IsEmail
    @Unique
    @Column(DataType.STRING)
    email!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;
  
    @HasMany(() => Post)
    posts!: Post[];
  }
  
  @Table
  export class Post extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    title!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    content!: string;
  
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId!: string;
  
    @BelongsTo(() => User)
    user!: User;
  }
  
