// src/app/atividades/page.tsx
import AtividadesFooter from "@/components/AtividadesFooter"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { db } from "@/database"
import { gear, stravaWorkouts } from "@/database/schema"
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/utils/mocks"
import { and, asc, count, desc, eq, inArray, sql } from "drizzle-orm"
import Link from "next/link"
import { buildQueryString, formatDistance, formatDuration, formatFullDate, formatPace, getActivityIcon } from "./utils"

export const dynamic = 'force-dynamic'

export default async function AtividadesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = searchParams ? await searchParams : {}
  
  const getParam = (key: string): string | undefined => {
    const val = params[key]
    if (typeof val === "string") return val
    if (Array.isArray(val)) return val[0]
    return undefined
  }

  const page = getParam("page") || "1"
  const currentPage = Math.max(1, parseInt(page, 10) || 1)
  const requestedPageSize = parseInt(getParam("pageSize") || String(DEFAULT_PAGE_SIZE), 10)
  const pageSize = PAGE_SIZE_OPTIONS.includes(requestedPageSize as any) 
    ? requestedPageSize 
    : DEFAULT_PAGE_SIZE
  const offset = (currentPage - 1) * pageSize

  const filters: Record<string, string | number | undefined> = {}

  const activityTypeParam = getParam("type")
  const activityType = activityTypeParam === undefined || activityTypeParam === "" ? "all" : activityTypeParam
  filters.type = activityType !== "all" ? activityType : undefined

  const gearIdParam = getParam("gearId")
  const gearIdValue = gearIdParam === undefined || gearIdParam === "" ? "all" : gearIdParam
  filters.gearId = gearIdValue !== "all" ? gearIdValue : undefined

  const sortValue = getParam("sort") || "date_desc"
  filters.sort = sortValue !== "date_desc" ? sortValue : undefined

  const whereConditions = []

  if (filters.type) {
    whereConditions.push(eq(stravaWorkouts.type, filters.type as string))
  }
  if (filters.gearId) {
    whereConditions.push(eq(stravaWorkouts.gearId, filters.gearId as string))
  }

  const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined

  let orderByClause
  switch (sortValue) {
    case "date_asc":
      orderByClause = asc(stravaWorkouts.startDate)
      break
    case "distance_desc":
      orderByClause = sql`CAST(${stravaWorkouts.distance} AS DECIMAL) DESC`
      break
    case "distance_asc":
      orderByClause = sql`CAST(${stravaWorkouts.distance} AS DECIMAL) ASC`
      break
    case "duration_desc":
      orderByClause = desc(stravaWorkouts.movingTime)
      break
    case "duration_asc":
      orderByClause = asc(stravaWorkouts.movingTime)
      break
    case "hr_desc":
      orderByClause = desc(stravaWorkouts.averageHeartrate)
      break
    case "hr_asc":
      orderByClause = asc(stravaWorkouts.averageHeartrate)
      break
    case "elevation_desc":
      orderByClause = sql`CAST(${stravaWorkouts.totalElevationGain} AS DECIMAL) DESC`
      break
    case "elevation_asc":
      orderByClause = sql`CAST(${stravaWorkouts.totalElevationGain} AS DECIMAL) ASC`
      break
    case "date_desc":
    default:
      orderByClause = desc(stravaWorkouts.startDate)
      break
  }

  const totalResult = await db
    .select({ total: count() })
    .from(stravaWorkouts)
    .where(whereClause)
  const total = Number(totalResult[0]?.total ?? 0)
  const totalPages = Math.ceil(total / pageSize)

  const atividades = await db
    .select()
    .from(stravaWorkouts)
    .where(whereClause)
    .orderBy(orderByClause)
    .limit(pageSize)
    .offset(offset)

  const distinctTypes = await db
    .selectDistinct({ type: stravaWorkouts.type })
    .from(stravaWorkouts)
    .orderBy(stravaWorkouts.type)

  const typeOptions = distinctTypes
    .map(row => row.type)
    .filter((type): type is string => type !== null && type !== undefined)

  const distinctGearIds = await db
    .selectDistinct({ gearId: stravaWorkouts.gearId })
    .from(stravaWorkouts)
    .where(sql`${stravaWorkouts.gearId} IS NOT NULL`)

  const gearIdsArray = distinctGearIds.map(row => row.gearId as string)
  const gearRecords = gearIdsArray.length > 0
    ? await db
        .select()
        .from(gear)
        .where(inArray(gear.id, gearIdsArray))
    : []

  const shoes = gearRecords
    .filter(g => (g.category ?? "Tênis") === "Tênis")
    .map(g => ({ id: g.id, name: g.name }))
  const bikes = gearRecords
    .filter(g => g.category === "Bicicleta")
    .map(g => ({ id: g.id, name: g.name }))

  const getPageUrl = (newPage: number) => {
    const query = buildQueryString(currentPage, pageSize, filters, newPage)
    return query ? `/atividades?${query}` : "/atividades"
  }

  return (
    <main className="min-h-screen w-full max-w-6xl mx-auto bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-4">
      <div className="space-y-12">
        <header className="flex mb-12 flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
              <span className="text-[#FC4C02]">Strava</span> Histórico
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Minhas execuções reais, sincronizadas automaticamente.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {total} atividade{total !== 1 ? 's' : ''} encontrada{total !== 1 ? 's' : ''}
            </p>
          </div>
        </header>

        {atividades.length === 0 ? (
          <p className="text-center text-zinc-500 dark:text-zinc-400 py-12">
            Nenhuma atividade encontrada com os filtros aplicados.
          </p>
        ) : (
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    {/* Aumentando o padding do TableHead com px-4 */}
                    <TableHead className="font-semibold py-4 px-4">Atividade</TableHead>
                    <TableHead className="font-semibold text-right py-4 px-4">Distância</TableHead>
                    <TableHead className="font-semibold text-right hidden md:table-cell py-4 px-4">Ritmo</TableHead>
                    <TableHead className="font-semibold text-right hidden lg:table-cell py-4 px-4">Tempo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {atividades.map((atividade) => {
                    // URL para a página de detalhes da atividade
                    const activityUrl = `/atividades/${atividade.id}`
                    
                    return (
                      <TableRow 
                        key={atividade.id}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                      >
                        <TableCell className="py-3 px-4">
                          <Link href={activityUrl} className="block">
                            <div className="flex items-center gap-4 min-w-[150px]">
                              {/* Aumentando o gap entre ícone e título para gap-4 */}
                              <span className="shrink-0">
                                {getActivityIcon(atividade.type)}
                              </span>
                              <div className="flex flex-col min-w-0">
                                <span className="font-medium truncate text-sm group-hover:text-[#FC4C02] transition-colors">
                                  {atividade.name}
                                </span>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate flex items-center gap-1">
                                  {formatFullDate(atividade.startDate)}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm font-medium py-3 px-4">
                          <Link href={activityUrl} className="block">
                            {formatDistance(atividade.distance)}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm hidden md:table-cell py-3 px-4">
                          <Link href={activityUrl} className="block">
                            {formatPace(atividade.averageSpeed, atividade.type)}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm hidden lg:table-cell py-3 px-4">
                          <Link href={activityUrl} className="block">
                            {formatDuration(atividade.movingTime)}
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      <AtividadesFooter
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        activityType={activityType}
        gearId={filters.gearId as string || ""}
        sortValue={sortValue}
        typeOptions={typeOptions}
        shoes={shoes}
        bikes={bikes}
      />
    </main>
  )
}