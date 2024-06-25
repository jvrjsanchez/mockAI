import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { transcript } = await request.json()
}
