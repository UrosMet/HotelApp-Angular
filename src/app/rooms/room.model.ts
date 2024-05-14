export interface Room {
  id: number;
  brojKreveta: number;
  tipKreveta: string;
  cenovnik: Cenovnik;
  klima: boolean;
}

export interface Cenovnik {
  id: number;
  cenaPoNoci: number;
}

export interface RoomImage {
  id: number;
  slikaUrl: string;
  idSoba: Room;
}
