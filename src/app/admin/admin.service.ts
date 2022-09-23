import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {oneRequest} from "./requests.model";

export interface SingleRequest {
  position: string;
  amount: number;
  numOfMonths: number;
  created: Date;
  status: string;
  id: string;
  name: string;
  surname: string;
  companyName: string;
  applicantType: string
}

export type AdminResponseData = SingleRequest[];

@Injectable({providedIn: 'root'})
export class AdminService {
  // requests = new BehaviorSubject<AdminResponseData>(null);

  constructor(private http: HttpClient) {
  }

  // GET, Header: Authorization: Bearer <token>
  // Response:
  // [{
  //      position: string,
  //      amount: number,
  //      numOfMonths: number,
  //      created: DateTime,
  //      status: string,
  //      id: string,
  //      name: string,
  //      surname: string,
  //      companyName: string,
  //      applicantType: string
  //   },
  //   …
  // ]


  getAllRequests(token: string) {
      return this.http
      .get<AdminResponseData>(
        'http://localhost:8000/request/list',
        {headers: new HttpHeaders({Authorization: "Bearer " + token})},
      )
  }

  displayOSVC(requests: oneRequest[]){
    return requests.filter(obj => {
      return obj.applicantType === "OSVC";
    });
  }

  displayNaturalPerson(requests: oneRequest[]){
    return requests.filter(obj => {
      return obj.applicantType === "INDIVIDUAL";
    });
  }

  displayLegalPerson(requests: oneRequest[]){
    return requests.filter(obj => {
      return obj.applicantType === "LEGAL_ENTITY";
    });
  }


}
