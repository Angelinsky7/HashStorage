export class PropertyCounter {

    private m_Count: number = 0;

    public get Count(): number {
        return this.m_Count;
    }

    public begin(): void {
        ++this.m_Count;
    }

    public end(): void {
        this.m_Count--;
        if (this.m_Count < 0) { this.m_Count = 0; }
    }

    public get isEnabled(): boolean {
        return this.m_Count > 0;
    }

}