interface Window {
  Parse: any
  initializeParse: () => Promise<boolean>
}

// Déclaration pour les classes Parse
declare namespace Parse {
  class User {
    static current(): Parse.User | null
    static logIn(username: string, password: string): Promise<Parse.User>
    static logOut(): Promise<void>
    id: string
    set(key: string, value: any): void
    get(key: string): any
    save(options?: object): Promise<Parse.User>
    signUp(options?: object): Promise<Parse.User>
    toJSON(): object
  }

  class Object {
    static extend(className: string): any
    id: string
    set(key: string, value: any): void
    get(key: string): any
    save(options?: object): Promise<Parse.Object>
    toJSON(): object
  }

  class Query {
    constructor(objectClass: any)
    equalTo(key: string, value: any): Parse.Query
    find(options?: object): Promise<Parse.Object[]>
    get(id: string, options?: object): Promise<Parse.Object>
    limit(n: number): Parse.Query
    include(key: string): Parse.Query
    descending(key: string): Parse.Query
  }
}
