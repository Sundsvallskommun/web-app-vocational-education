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
  scopes?: number[];
  /** Levels used for filtering */
  levels?: string[];
  /** Categories used for filtering */
  categories?: string[];
  /** Category ids used for filtering */
  subCategories?: string[];
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

export interface CourseParameters {
  /**
   * Page number
   * @format int32
   * @min 1
   * @default 1
   * @example 1
   */
  page?: number;
  /**
   * Result size per page. Maximum allowed value is dynamically configured
   * @format int32
   * @min 1
   * @example 15
   */
  limit?: number;
  sortBy?: string[];
  /** The sort order direction */
  sortDirection?: Direction;
  /**
   * Course code
   * @example "KEMKEM02"
   */
  code?: string;
  /**
   * Name of the course
   * @example "Etnicitet och kulturmöten"
   */
  name?: string;
  /**
   * Provider of the course
   * @example "Sundsvalls Kommun"
   */
  provider?: string;
  /**
   * Course credits
   * @example "100"
   */
  credits?: string;
  /**
   * Information about the course
   * @example "This is course information"
   */
  information?: string;
  /**
   * Language of instruction
   * @example "Swedish"
   */
  languageOfInstruction?: string;
  /**
   * Search string
   * @example "searchString"
   */
  searchString?: string;
  /**
   * Start date of the course
   * @format date
   * @example "2022-12-31"
   */
  start?: string;
  /**
   * Start date of the course is after
   * @format date
   * @example "2022-12-31"
   */
  startAfter?: string;
  /**
   * Start date of the course is before
   * @format date
   * @example "2022-12-31"
   */
  startBefore?: string;
  /**
   * End date of the course
   * @format date
   * @example "2022-12-31"
   */
  end?: string;
  /**
   * End date of the course is after
   * @format date
   * @example "2022-12-31"
   */
  endAfter?: string;
  /**
   * End date of the course is before
   * @format date
   * @example "2022-12-31"
   */
  endBefore?: string;
  /**
   * Earliest application date
   * @format date
   * @example "2022-12-31"
   */
  earliestApplication?: string;
  /**
   * Earliest application date is after
   * @format date
   * @example "2022-12-31"
   */
  earliestApplicationAfter?: string;
  /**
   * Earliest application date is before
   * @format date
   * @example "2022-12-31"
   */
  earliestApplicationBefore?: string;
  /**
   * Latest application date
   * @format date
   * @example "2022-12-31"
   */
  latestApplication?: string;
  /**
   * Latest application date is after
   * @format date
   * @example "2022-12-31"
   */
  latestApplicationAfter?: string;
  /**
   * Latest application date is before
   * @format date
   * @example "2022-12-31"
   */
  latestApplicationBefore?: string;
  /**
   * Scope of the course
   * @example 75
   */
  scopes?: number[];
  /**
   * Study location
   * @example "Sundsvall"
   */
  studyLocations?: string[];
  /**
   * Level of the course
   * @example "gymnasial vuxenutbildning"
   */
  levels?: string[];
  /**
   * Category
   * @example "Naturvetenskap"
   */
  categories?: string[];
  /**
   * Subcategory
   * @example "Kemi"
   */
  subcategories?: string[];
}

/**
 * The sort order direction
 * @example "ASC"
 */
export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
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
   * Course category
   * @example "Ekonomi, marknadsföring och administration"
   */
  category?: string;
  /**
   * Course subcategory
   * @example "Administration"
   */
  subcategory?: string;
  /**
   * Language of instruction
   * @example "Swedish"
   */
  languageOfInstruction?: string;
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
