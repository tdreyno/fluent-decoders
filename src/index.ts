/* eslint-disable @typescript-eslint/no-explicit-any */
import * as D from "decoders"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AllowImplicit } from "decoders/helpers"

export class Decoder<T> {
  guard: D.Guard<T>

  constructor(public decoder: D.Decoder<T>) {
    this.guard = D.guard(this.decoder)
  }

  map<V>(mapper: (value: T) => V): Decoder<V> {
    return new Decoder(D.map(this.decoder, mapper))
  }

  refine<V extends T>(
    typeGuard: (data: T) => data is V,
    reason = "Does not pass predicate",
  ): Decoder<V> {
    return new Decoder(D.compose(this.decoder, D.predicate(typeGuard, reason)))
  }
}

export type $DecoderType<T> = T extends Decoder<infer V> ? V : never

export type ObjectDecoderType<T> = AllowImplicit<
  { [key in keyof T]: $DecoderType<T[key]> }
>

export type $DDecoderType<T> = T extends D.Decoder<infer V> ? V : never
export type DObjectDecoderType<T> = AllowImplicit<
  { [key in keyof T]: $DDecoderType<T[key]> }
>

export const F = <T, Args extends unknown[]>(
  fn: (...args: Args) => D.Decoder<T>,
) => (...args: Args) => new Decoder(fn(...args))

export const P = <T>(decoder: D.Decoder<T>) => F<T, []>(() => decoder)()

// array
export const array = F(D.array)
export const poja = P(D.poja)

// boolean
export const boolean = P(D.boolean)
export const numericBoolean = P(D.numericBoolean)
export const truthy = P(D.truthy)

// constants
export const constant = F(D.constant)
export const hardcoded = F(D.hardcoded)
// export const mixed = F(D.mixed)
export const null_ = P(D.null_)
export const undefined_ = P(D.undefined_)
export const unknown = P(D.unknown)

// date
export const date = P(D.date)
export const iso8601 = P(D.iso8601)

// dispatch
// export const dispatch = F(D.dispatch)

// either
export const either = <T1, T2>(
  d1: Decoder<T1>,
  d2: Decoder<T2>,
): Decoder<T1 | T2> => new Decoder(D.either(d1.decoder, d2.decoder))

export const either3 = <T1, T2, T3>(
  d1: Decoder<T1>,
  d2: Decoder<T2>,
  d3: Decoder<T3>,
): Decoder<T1 | T2 | T3> =>
  new Decoder(D.either3(d1.decoder, d2.decoder, d3.decoder))

export const either4 = <T1, T2, T3, T4>(
  d1: Decoder<T1>,
  d2: Decoder<T2>,
  d3: Decoder<T3>,
  d4: Decoder<T4>,
): Decoder<T1 | T2 | T3 | T4> =>
  new Decoder(D.either4(d1.decoder, d2.decoder, d3.decoder, d4.decoder))

// either5
// either6
// either7
// either8
// either9

export const oneOf = F(D.oneOf)
export const fail = F(D.fail)

// instanceOf
export const instanceOf = F(D.instanceOf)

// json
export const json = P(D.json)
export const jsonArray = P(D.jsonArray)
export const jsonObject = P(D.jsonObject)

// lazy
export const lazy = <T>(fn: () => Decoder<T>): Decoder<T> =>
  new Decoder(blob => fn().decoder(blob))

// mapping
export const mapping = <T>(decoder: Decoder<T>): Decoder<Map<string, T>> =>
  new Decoder(D.mapping(decoder.decoder))
export const dict = <T>(decoder: Decoder<T>): Decoder<{ [key: string]: T }> =>
  new Decoder(D.dict(decoder.decoder))

// number
export const integer = P(D.integer)
export const number = P(D.number)
export const positiveInteger = P(D.positiveInteger)
export const positiveNumber = P(D.positiveNumber)

// object
export const object = <O extends { [key: string]: Decoder<any> }>(mapping: O) =>
  new Decoder(
    D.object(
      Object.keys(mapping).reduce(
        (sum, key) => ((sum[key] = mapping[key].decoder), sum),
        {} as any,
      ),
    ),
  ) as Decoder<{ [K in keyof ObjectDecoderType<O>]: ObjectDecoderType<O>[K] }>

export const exact = <O extends { [key: string]: Decoder<any> }>(mapping: O) =>
  new Decoder(
    D.exact(
      Object.keys(mapping).reduce(
        (sum, key) => ((sum[key] = mapping[key].decoder), sum),
        {} as any,
      ),
    ),
  ) as Decoder<{ [K in keyof ObjectDecoderType<O>]: ObjectDecoderType<O>[K] }>

export const inexact = <O extends { [key: string]: Decoder<any> }>(
  mapping: O,
) =>
  new Decoder(
    D.inexact(
      Object.keys(mapping).reduce(
        (sum, key) => ((sum[key] = mapping[key].decoder), sum),
        {} as any,
      ),
    ),
  ) as Decoder<
    { [K in keyof ObjectDecoderType<O>]: ObjectDecoderType<O>[K] } & {
      [extra: string]: unknown
    }
  >

export const pojo = P(D.pojo)

// optional
export const maybe = <T1>(d1: Decoder<T1>) => new Decoder(D.maybe(d1.decoder))
export const optional = <T1>(d1: Decoder<T1>) =>
  new Decoder(D.optional(d1.decoder))
export const nullable = <T1>(d1: Decoder<T1>) =>
  new Decoder(D.nullable(d1.decoder))

// string
export const string = P(D.string)
export const email = P(D.email)
export const url = F(D.url)
export const regex = F(D.regex)

// tuple
export const tuple2 = <T1, T2>(d1: Decoder<T1>, d2: Decoder<T2>) =>
  new Decoder(D.tuple2(d1.decoder, d2.decoder))

export const tuple3 = <T1, T2, T3>(
  d1: Decoder<T1>,
  d2: Decoder<T2>,
  d3: Decoder<T3>,
) => new Decoder(D.tuple3(d1.decoder, d2.decoder, d3.decoder))

export const tuple4 = <T1, T2, T3, T4>(
  d1: Decoder<T1>,
  d2: Decoder<T2>,
  d3: Decoder<T3>,
  d4: Decoder<T4>,
) => new Decoder(D.tuple4(d1.decoder, d2.decoder, d3.decoder, d4.decoder))

export const tuple5 = <T1, T2, T3, T4, T5>(
  d1: Decoder<T1>,
  d2: Decoder<T2>,
  d3: Decoder<T3>,
  d4: Decoder<T4>,
  d5: Decoder<T5>,
) =>
  new Decoder(
    D.tuple5(d1.decoder, d2.decoder, d3.decoder, d4.decoder, d5.decoder),
  )

export const tuple6 = <T1, T2, T3, T4, T5, T6>(
  d1: Decoder<T1>,
  d2: Decoder<T2>,
  d3: Decoder<T3>,
  d4: Decoder<T4>,
  d5: Decoder<T5>,
  d6: Decoder<T6>,
) =>
  new Decoder(
    D.tuple6(
      d1.decoder,
      d2.decoder,
      d3.decoder,
      d4.decoder,
      d5.decoder,
      d6.decoder,
    ),
  )
