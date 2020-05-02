interface Body<TVariables> {
  query: string,
  variables?: TVariables
}
interface Error {
  message: string;
}
export const server = {
  fetch: async<TData = any, TVariables = any> (body: Body<TVariables>) => {
    const res = await fetch('/api', { //package.json da "proxy": "http://localhost:9000" tanimladigimizdan dolayi boyle istekte bulunabiliyoruz.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body) //JSON yani obje olarak gonderemeyecegimiz icin yaziya ceviririz once
    });

    if(!res.ok) {
      throw new Error('failed to fetch from server');
    }

    return res.json() as Promise<{ data: TData, errors: Error[] }>; //Veya yuakrida yandaki sekildede Promise sozunu ayarlayabilirdik. fetch: async<TData = any> (body: Body): Promise<{ data: TData }>
  }
};