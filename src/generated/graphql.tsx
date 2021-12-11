import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Catagory = {
  __typename?: 'Catagory';
  id: Scalars['ID'];
  name: Scalars['String'];
  videos?: Maybe<Array<Video>>;
};

export type Comment = {
  __typename?: 'Comment';
  childComments?: Maybe<Array<Comment>>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  parentComment?: Maybe<Comment>;
  updatedAt: Scalars['DateTime'];
  user: User;
  usersDisLiked?: Maybe<Array<User>>;
  usersLiked?: Maybe<Array<User>>;
  video: Video;
};

export type FieldError = {
  __typename?: 'FieldError';
  error: Scalars['String'];
  type: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserMutationResponse;
  refreshToken: UserMutationResponse;
  signup: UserMutationResponse;
};


export type MutationLoginArgs = {
  loginInput?: InputMaybe<LoginInput>;
  socialLogin?: InputMaybe<SocialLogin>;
};


export type MutationSignupArgs = {
  signupInput: SignupInput;
};

export type MutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
};

export type SignupInput = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SocialLogin = {
  accessToken: Scalars['String'];
  type: Strategy;
};

/** strategy login with social */
export enum Strategy {
  Google = 'GOOGLE',
  Local = 'LOCAL'
}

export type User = {
  __typename?: 'User';
  chanels?: Maybe<Array<User>>;
  channelDecscription?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comment>>;
  commentsDisLiked?: Maybe<Array<Comment>>;
  commentsLiked?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  image_url?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  role: Scalars['String'];
  socialId?: Maybe<Scalars['String']>;
  subscribers?: Maybe<Array<User>>;
  updatedAt: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
  videos?: Maybe<Array<Video>>;
  videosDisLiked?: Maybe<Array<Video>>;
  videosLiked?: Maybe<Array<Video>>;
  watchLaterVideos?: Maybe<Array<Video>>;
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Video = {
  __typename?: 'Video';
  catagories?: Maybe<Array<Catagory>>;
  commentable: Scalars['Boolean'];
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  size: Scalars['Float'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  usersDisLiked?: Maybe<Array<User>>;
  usersLiked?: Maybe<Array<User>>;
  usersWatchLater?: Maybe<Array<User>>;
};

export type CatagoryInfoFragment = { __typename?: 'Catagory', id: string, name: string };

export type CommentInfoFragment = { __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any };

export type FieldErrorFragment = { __typename?: 'FieldError', type: string, error: string };

export type MutationStatusesFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type UserInfoFragment = { __typename?: 'User', id: string, username?: string | null | undefined, email: string, socialId?: string | null | undefined, firstName: string, lastName: string, channelDecscription?: string | null | undefined, image_url?: string | null | undefined, dateOfBirth?: any | null | undefined, role: string, createdAt: any, updatedAt: any };

export type VideoInfoFragment = { __typename?: 'Video', id: string, title: string, description: string, commentable: boolean, thumbnailUrl?: string | null | undefined, size: number, createdAt: any, updatedAt: any };

export type LoginMutationVariables = Exact<{
  loginInput?: InputMaybe<LoginInput>;
  socialLogin?: InputMaybe<SocialLogin>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', token?: string | null | undefined, code: number, success: boolean, message?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', type: string, error: string }> | null | undefined } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'UserMutationResponse', token?: string | null | undefined, code: number, success: boolean, message?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', type: string, error: string }> | null | undefined } };

export type SignupMutationVariables = Exact<{
  signupInput: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserMutationResponse', token?: string | null | undefined, code: number, success: boolean, message?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', type: string, error: string }> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username?: string | null | undefined, email: string, socialId?: string | null | undefined, firstName: string, lastName: string, channelDecscription?: string | null | undefined, image_url?: string | null | undefined, dateOfBirth?: any | null | undefined, role: string, createdAt: any, updatedAt: any } | null | undefined };

export const CatagoryInfoFragmentDoc = gql`
    fragment catagoryInfo on Catagory {
  id
  name
}
    `;
export const CommentInfoFragmentDoc = gql`
    fragment commentInfo on Comment {
  id
  content
  createdAt
  updatedAt
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  type
  error
}
    `;
export const MutationStatusesFragmentDoc = gql`
    fragment mutationStatuses on UserMutationResponse {
  code
  success
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  username
  email
  socialId
  firstName
  lastName
  channelDecscription
  image_url
  dateOfBirth
  role
  createdAt
  updatedAt
}
    `;
export const VideoInfoFragmentDoc = gql`
    fragment videoInfo on Video {
  id
  title
  description
  commentable
  thumbnailUrl
  size
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput, $socialLogin: SocialLogin) {
  login(loginInput: $loginInput, socialLogin: $socialLogin) {
    ...mutationStatuses
    token
    errors {
      ...fieldError
    }
  }
}
    ${MutationStatusesFragmentDoc}
${FieldErrorFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *      socialLogin: // value for 'socialLogin'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken {
    ...mutationStatuses
    token
    errors {
      ...fieldError
    }
  }
}
    ${MutationStatusesFragmentDoc}
${FieldErrorFragmentDoc}`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($signupInput: SignupInput!) {
  signup(signupInput: $signupInput) {
    ...mutationStatuses
    token
    errors {
      ...fieldError
    }
  }
}
    ${MutationStatusesFragmentDoc}
${FieldErrorFragmentDoc}`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signupInput: // value for 'signupInput'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;