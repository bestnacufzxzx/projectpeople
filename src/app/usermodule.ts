export class Usermodule {
  // <!-- CITIZEN_ID,TITLE,FIRST_NAME,LAST_NAME,SEX,BLOOD,BIRTH_DATE FROM is_t_citizen -->

    public CITIZEN_ID: string;
    public TITLE: string;
    public FIRST_NAME:string;
    public LAST_NAME:string;
    public SEX:string;
    public BLOOD:string;
    public BIRTH_DATE:string;
    constructor(CITIZEN_ID:string, TITLE:string, FIRST_NAME:string, LAST_NAME:string, SEX:string, BLOOD:string, BIRTH_DATE:string) 
    {
      this.CITIZEN_ID = CITIZEN_ID;
      this.TITLE = TITLE;
      this.FIRST_NAME = FIRST_NAME;
      this.LAST_NAME = LAST_NAME;
      this.SEX=SEX;
      this.BLOOD=BLOOD;
      this.BIRTH_DATE=BIRTH_DATE;
    }
}