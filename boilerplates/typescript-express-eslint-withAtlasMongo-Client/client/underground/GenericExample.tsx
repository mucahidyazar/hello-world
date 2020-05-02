//StatelessComponentlara asagidaki gibi ulasabiliriz.
// import React, { StatelessComponent, SFC } from "react";

//Yada asagidaki gibi FunctionalComponent yapisina ulasabilir ve oradaki Generic yapisiyla propslara ozelliklerimizi asagidaki gibi verebiliriz.
import React, { FunctionComponent, FC } from "react";

interface Props {
  title: string
}

export const Listings = ({ title }: Props) => {
  return <h2>{title}</h2>;
};

//Yani burada Listining2 FunctionalComponent yapisiyla olacak diyoruz ve icinede Props interfacesindeki tanimlanmis typelari generic olarak gonderdigimiz icin sadece interfacedeki degerleri argument olarak icine alabilir bir functional komponent oluyor.
export const Listings2: FunctionComponent<Props> = ({ title, children }) => {
  return <h2>{title}</h2>;
};