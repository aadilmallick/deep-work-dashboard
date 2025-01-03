import "./style.css";

const textareaNotes = document.querySelector("#notes") as HTMLTextAreaElement;

export class LocalStorageBrowser<T extends Record<string, any>> {
  constructor(private prefix: string = "") {}

  private getKey(key: keyof T & string): string {
    return this.prefix + key;
  }

  public set<K extends keyof T & string>(key: K, value: T[K]): void {
    window.localStorage.setItem(this.getKey(key), JSON.stringify(value));
  }

  public get<K extends keyof T & string>(key: K): T[K] | null {
    const item = window.localStorage.getItem(this.getKey(key));
    return item ? JSON.parse(item) : null;
  }

  public removeItem(key: keyof T & string): void {
    window.localStorage.removeItem(this.getKey(key));
  }

  public clear(): void {
    window.localStorage.clear();
  }
}

const storage = new LocalStorageBrowser<{ notes: string }>("notes-");

const notes = storage.get("notes");
if (notes) {
  textareaNotes.value = notes;
}

textareaNotes.addEventListener("blur", () => {
  storage.set("notes", textareaNotes.value);
});
