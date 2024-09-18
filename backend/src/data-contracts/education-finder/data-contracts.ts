/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Problem {
  /** @format uri */
  instance?: string;
  /** @format uri */
  type?: string;
  parameters?: Record<string, object>;
  status?: StatusType;
  title?: string;
  detail?: string;
}

export interface StatusType {
  /** @format int32 */
  statusCode?: number;
  reasonPhrase?: string;
}

export interface ConstraintViolationProblem {
  cause?: ThrowableProblem;
  stackTrace?: {
    classLoaderName?: string;
    moduleName?: string;
    moduleVersion?: string;
    methodName?: string;
    fileName?: string;
    /** @format int32 */
    lineNumber?: number;
    className?: string;
    nativeMethod?: boolean;
  }[];
  /** @format uri */
  type?: string;
  status?: StatusType;
  violations?: Violation[];
  title?: string;
  message?: string;
  /** @format uri */
  instance?: string;
  parameters?: Record<string, object>;
  detail?: string;
  suppressed?: {
    stackTrace?: {
      classLoaderName?: string;
      moduleName?: string;
      moduleVersion?: string;
      methodName?: string;
      fileName?: string;
      /** @format int32 */
      lineNumber?: number;
      className?: string;
      nativeMethod?: boolean;
    }[];
    message?: string;
    localizedMessage?: string;
  }[];
  localizedMessage?: string;
}

export interface ThrowableProblem {
  cause?: ThrowableProblem;
  stackTrace?: {
    classLoaderName?: string;
    moduleName?: string;
    moduleVersion?: string;
    methodName?: string;
    fileName?: string;
    /** @format int32 */
    lineNumber?: number;
    className?: string;
    nativeMethod?: boolean;
  }[];
  message?: string;
  /** @format uri */
  instance?: string;
  /** @format uri */
  type?: string;
  parameters?: Record<string, object>;
  status?: StatusType;
  title?: string;
  detail?: string;
  suppressed?: {
    stackTrace?: {
      classLoaderName?: string;
      moduleName?: string;
      moduleVersion?: string;
      methodName?: string;
      fileName?: string;
      /** @format int32 */
      lineNumber?: number;
      className?: string;
      nativeMethod?: boolean;
    }[];
    message?: string;
    localizedMessage?: string;
  }[];
  localizedMessage?: string;
}

export interface Violation {
  field?: string;
  message?: string;
}

/** Statistics model */
export interface Statistics {
  /**
   * Number of on-going courses
   * @format int32
   * @example 10
   */
  onGoingCourses?: number;
  /**
   * Number of planned courses
   * @format int32
   * @example 10
   */
  plannedCourses?: number;
  /**
   * Number of finished courses
   * @format int32
   * @example 10
   */
  finishedCourses?: number;
  /**
   * Number of available seats
   * @format int32
   * @example 10
   */
  availableSeats?: number;
  /**
   * Total capacity
   * @format int32
   * @example 10
   */
  totalCapacity?: number;
  /** Study locations used for filtering */
  studyLocations?: string[];
  /** Scopes used for filtering */
  scopes?: string[];
  /** Levels used for filtering */
  levels?: string[];
  /** Categories used for filtering */
  categories?: string[];
  /** Category ids used for filtering */
  categoryIds?: string[];
  /**
   * Start date used for filtering
   * @format date
   */
  startDate?: string;
  /**
   * End date used for filtering
   * @format date
   */
  endDate?: string;
}

/** Statistics filter model */
export enum StatisticsFilter {
  Level = 'level',
  Scope = 'scope',
  Category = 'category',
  CategoryId = 'categoryId',
  StudyLocation = 'studyLocation',
  StartDate = 'startDate',
  EndDate = 'endDate',
}

/** Course model */
export interface Course {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Course code
   * @example "PRRPRR02"
   */
  code?: string;
  /**
   * Course name
   * @example "Programmering 2"
   */
  name?: string;
  /**
   * Course provider
   * @example "Sundsvalls Kommun"
   */
  provider?: string;
  /**
   * Course provider URL
   * @example "http://sundsvall.se/vuxenutbildning"
   */
  providerUrl?: string;
  /**
   * Course level
   * @example "gymnasial vuxenutbildning"
   */
  level?: string;
  /**
   * Course URL
   * @example "https://sundsvall.alvis.se/hittakurser/kurs/38837"
   */
  url?: string;
  /**
   * Course credits
   * @format double
   * @example 150
   */
  credits?: number;
  /**
   * Course scope in percent
   * @format double
   * @example 100
   */
  scope?: number;
  /**
   * Study location
   * @example "Sundsvall"
   */
  studyLocation?: string;
  /**
   * Subject code
   * @example "PRRPRR02"
   */
  subjectCode?: string;
  /**
   * Number of seats
   * @format int32
   * @example 10
   */
  numberOfSeats?: number;
  /**
   * Course start date
   * @format date
   * @example "2020-08-31"
   */
  start?: string;
  /**
   * Course end date
   * @format date
   * @example "2020-12-20"
   */
  end?: string;
  /**
   * Earliest application date
   * @format date
   * @example "2020-01-01"
   */
  earliestApplication?: string;
  /**
   * Latest application date
   * @format date
   * @example "2020-04-15"
   */
  latestApplication?: string;
  /**
   * Course information
   * @example "<![CDATA[ <p><a href=https://sundsvall.se/utbildning-och-forskola/vuxenutbildning/gymnasial--niva/studieformer-och-schema target=_blank>Läs&nbsp;om våra studieformer</a></p><p><br /><a href=https://www.csn.se/ target=_blank>Läs om studiemedel på&nbsp;www.csn.se</a><br />&nbsp;<br />Ditt antagningsbesked<br />Antagningsbesked skickas via e-post cirka två veckor före kursstart.&nbsp;<a href=https://sundsvall.alvis.se/>Se ditt antagningsbesked och följ din ansökan via Mina sidor</a>.</p> ]]>"
   */
  information?: string;
}

/** Paged course response model */
export interface PagedCoursesResponse {
  courses?: Course[];
  /** PagingMetaData model */
  _meta?: PagingMetaData;
}

/** PagingMetaData model */
export interface PagingMetaData {
  /**
   * Current page
   * @format int32
   * @example 5
   */
  page?: number;
  /**
   * Displayed objects per page
   * @format int32
   * @example 20
   */
  limit?: number;
  /**
   * Displayed objects on current page
   * @format int32
   * @example 13
   */
  count?: number;
  /**
   * Total amount of hits based on provided search parameters
   * @format int64
   * @example 98
   */
  totalRecords?: number;
  /**
   * Total amount of pages based on provided search parameters
   * @format int32
   * @example 23
   */
  totalPages?: number;
}

/** Course filter model */
export enum CourseFilter {
  Credits = 'credits',
  Provider = 'provider',
  Level = 'level',
  Scope = 'scope',
  StudyLocation = 'studyLocation',
}
