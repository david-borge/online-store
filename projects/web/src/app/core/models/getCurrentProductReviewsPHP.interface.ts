import { ReviewInterface } from "./review.interface";
import { UserInterface } from "./user.interface";

export interface GetCurrentProductReviewsPHPInterface {

    title               : ReviewInterface['title'];
    starsWidth          : number;
    publicationFullDate : ReviewInterface['publicationFullDate'];
    content             : ReviewInterface['content'];
    fullName            : UserInterface["firstName"];

}
