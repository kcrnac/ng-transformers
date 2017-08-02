export class CompareHelper {
    
    // Comparing objects by ID
    static compare(c1: any, c2: any): boolean {

        return c1 && c2 ? c1._id === c2._id : c1 === c2;
    }
}