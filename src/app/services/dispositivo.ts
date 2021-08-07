export class Dispositivo {

    private _dispositivoId: number = 0;
    private _nombre: string = "";
    private _ubicacion: string = "";
    private _electrovalvulaId: number = 0;

    constructor(id: number = 0, nombre: string = "", ubicacion: string = "", id_electrovalvula: number = 0) {
        this.dispositivoId = id;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.electrovalvulaId = id_electrovalvula;
    }

    public get dispositivoId (): number {
        return this._dispositivoId;
    }

    public set dispositivoId (id: number) {
        this._dispositivoId = id;
    }

    public get nombre (): string {
        return this._nombre;
    }

    public set nombre (nombre: string) {
        this._nombre = nombre;
    }

    public get ubicacion (): string {
        return this._ubicacion;
    }

    public set ubicacion (ubicacion: string) {
        this._ubicacion = ubicacion;
    }

    public get electrovalvulaId (): number {
        return this._electrovalvulaId;
    }

    public set electrovalvulaId (id: number) {
        this._electrovalvulaId = id;
    }
}