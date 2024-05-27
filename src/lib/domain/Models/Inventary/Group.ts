export default class Group{
    GroupId: string;
    GroupName: string;
    Select: boolean=false;
    constructor(GroupId: string, GroupName: string){
        this.GroupName=GroupName;
        this.GroupId=GroupId;
    }
}