import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1/"
      : "https://backend.mokugyo.biz/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getExperiences = () =>
  instance.get("experiences/").then((response) => response.data);

export const getExperience = ({ queryKey }: QueryFunctionContext) => {
  const [_, experiencePk] = queryKey;
  return instance
    .get(`experiences/${experiencePk}`)
    .then((response) => response.data);
};

export const getExperienceReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, experiencePk] = queryKey;
  return instance
    .get(`experiences/${experiencePk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string | null) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogIn = (code: string | null) =>
  instance
    .post(
      `users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const naverLogIn = (code: string | null) =>
  instance
    .post(
      `/users/naver`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}

export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface ISignUpVariables {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const signUp = ({ name, email, username, password }: ISignUpVariables) =>
  instance
    .post(
      `users/sign-up`,
      { name, email, username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get(`rooms/amenities`).then((response) => response.data);

export const getRoomAmenities = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/amenities`)
    .then((response) => response.data);
};

export const getPerks = () =>
  instance.get(`experiences/perks`).then((response) => response.data);

export const getExperiencePerks = ({ queryKey }: QueryFunctionContext) => {
  const [_, experiencePk] = queryKey;
  return instance
    .get(`experiences/${experiencePk}/perks`)
    .then((response) => response.data);
};

export const getCategories = () =>
  instance.get(`categories`).then((response) => response.data);

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const uploadRoom = (variables: IUploadRoomVariables) =>
  instance
    .post(`rooms/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getRoomUploadURL = () =>
  instance
    .post(`medias/photos/get-room-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUploadImageVariables {
  file: FileList;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export interface ICreateRoomPhotoVariables {
  description: string;
  file: string;
  roomPk: string;
}

export const createRoomPhoto = ({
  description,
  file,
  roomPk,
}: ICreateRoomPhotoVariables) =>
  instance
    .post(
      `rooms/${roomPk}/photos`,
      { description, file },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IUploadExperienceVariables {
  country: string;
  city: string;
  name: string;
  host: boolean;
  pet_friendly: boolean;
  price: number;
  address: string;
  description: string;
  perks: number[];
  category: number;
}

export const uploadExperience = (variables: IUploadExperienceVariables) =>
  instance
    .post(`experiences/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getExperienceUploadURL = () =>
  instance
    .post(`medias/photos/get-experience-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface ICreateExperiencePhotoVariables {
  description: string;
  file: string;
  experiencePk: string;
}

export const createExperiencePhoto = ({
  description,
  file,
  experiencePk,
}: ICreateExperiencePhotoVariables) =>
  instance
    .post(
      `experiences/${experiencePk}/photos`,
      { description, file },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkRoomBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, roomPk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkIn = firstDate?.toLocaleDateString("fr-CA");
    const checkOut = secondDate?.toLocaleDateString("fr-CA");
    return instance
      .get(
        `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};

export const checkExperienceBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, experiencePk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkIn = firstDate?.toLocaleDateString("fr-CA");
    const checkOut = secondDate?.toLocaleDateString("fr-CA");
    return instance
      .get(
        `experiences/${experiencePk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};
