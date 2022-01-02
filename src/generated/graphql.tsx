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

export enum Action {
  Activate = 'ACTIVATE',
  Disactivate = 'DISACTIVATE'
}

export type Catagory = {
  __typename?: 'Catagory';
  id: Scalars['ID'];
  name: Scalars['String'];
  videos?: Maybe<Array<Video>>;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  numUsersDisLiked?: Maybe<Scalars['Float']>;
  numUsersLiked?: Maybe<Scalars['Float']>;
  parentComment?: Maybe<Comment>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CommentMutationResponse = MutationResponse & {
  __typename?: 'CommentMutationResponse';
  code: Scalars['Float'];
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateCommentInput = {
  content: Scalars['String'];
};

export type CreateVideoInput = {
  commentable?: InputMaybe<Scalars['Boolean']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  size: Scalars['String'];
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  error: Scalars['String'];
  type: Scalars['String'];
};

export type GetCommentInput = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Float'];
  parentCmtId?: InputMaybe<Scalars['String']>;
  videoId: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentMutationResponse;
  createVideo: VideoMutationResponse;
  deleteVideo: VideoMutationResponse;
  login: UserMutationResponse;
  logout: Scalars['Boolean'];
  refreshToken: UserMutationResponse;
  signup: UserMutationResponse;
  updateComment: CommentMutationResponse;
  updateInfo: UserMutationResponse;
  updateVideo: VideoMutationResponse;
  voteVideo: VideoMutationResponse;
  watchLater: VideoMutationResponse;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
  parentCommentId?: InputMaybe<Scalars['String']>;
  videoId: Scalars['String'];
};


export type MutationCreateVideoArgs = {
  createVideoInput: CreateVideoInput;
};


export type MutationDeleteVideoArgs = {
  videoId: Scalars['ID'];
};


export type MutationLoginArgs = {
  loginInput?: InputMaybe<LoginInput>;
  socialLogin?: InputMaybe<SocialLogin>;
};


export type MutationSignupArgs = {
  signupInput: SignupInput;
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['String'];
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateInfoArgs = {
  updateInput: UpdateUserInfoInput;
};


export type MutationUpdateVideoArgs = {
  updateVideoInput: UpdateVideoInput;
  videoId: Scalars['ID'];
};


export type MutationVoteVideoArgs = {
  action: Action;
  type: VoteType;
  videoId: Scalars['ID'];
};


export type MutationWatchLaterArgs = {
  action: Action;
  videoId: Scalars['ID'];
};

export type MutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type PaginatedComments = PaginatedResponse & {
  __typename?: 'PaginatedComments';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedComments: Array<Comment>;
  totalCount: Scalars['Float'];
};

export type PaginatedResponse = {
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  totalCount: Scalars['Float'];
};

export type PaginatedVideos = PaginatedResponse & {
  __typename?: 'PaginatedVideos';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedVideos: Array<Video>;
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  comment?: Maybe<Comment>;
  comments?: Maybe<PaginatedComments>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  video?: Maybe<Video>;
  videos?: Maybe<PaginatedVideos>;
};


export type QueryCommentArgs = {
  id: Scalars['String'];
};


export type QueryCommentsArgs = {
  getCmtInput: GetCommentInput;
};


export type QueryVideoArgs = {
  id: Scalars['ID'];
};


export type QueryVideosArgs = {
  catagory?: InputMaybe<Array<Scalars['String']>>;
  catagoryId?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  query?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Array<Scalars['String']>>;
  userId?: InputMaybe<Scalars['String']>;
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

export type UpdateCommentInput = {
  content: Scalars['String'];
};

export type UpdateUserInfoInput = {
  banner_id?: InputMaybe<Scalars['String']>;
  channelDecscription?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  image_url?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type UpdateVideoInput = {
  commentable?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  banner_id?: Maybe<Scalars['String']>;
  chanelsSubscribe?: Maybe<Array<User>>;
  channelDecscription?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image_url?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  role: Scalars['String'];
  socialId?: Maybe<Scalars['String']>;
  subscribers?: Maybe<Array<User>>;
  updatedAt: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
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
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  numUsersDisLiked?: Maybe<Scalars['Float']>;
  numUsersLiked?: Maybe<Scalars['Float']>;
  size: Scalars['String'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type VideoMutationResponse = MutationResponse & {
  __typename?: 'VideoMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  video?: Maybe<Video>;
};

export enum VoteType {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

export type CatagoryInfoFragment = { __typename?: 'Catagory', id: string, name: string };

export type CommentInfoFragment = { __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any };

export type FieldErrorFragment = { __typename?: 'FieldError', type: string, error: string };

type MutationStatuses_CommentMutationResponse_Fragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null | undefined };

type MutationStatuses_UserMutationResponse_Fragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined };

type MutationStatuses_VideoMutationResponse_Fragment = { __typename?: 'VideoMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type MutationStatusesFragment = MutationStatuses_CommentMutationResponse_Fragment | MutationStatuses_UserMutationResponse_Fragment | MutationStatuses_VideoMutationResponse_Fragment;

export type UserInfoFragment = { __typename?: 'User', id: string, username?: string | null | undefined, email: string, socialId?: string | null | undefined, firstName: string, lastName: string, fullName?: string | null | undefined, channelDecscription?: string | null | undefined, image_url?: string | null | undefined, banner_id?: string | null | undefined, dateOfBirth?: any | null | undefined, role: string, createdAt: any, updatedAt: any };

export type VideoInfoFragment = { __typename?: 'Video', id: string, title: string, description: string, commentable: boolean, thumbnailUrl?: string | null | undefined, size: string, createdAt: any, updatedAt: any };

export type CreateCommentMutationVariables = Exact<{
  videoId: Scalars['String'];
  createCommentInput: CreateCommentInput;
  parentCommentId?: InputMaybe<Scalars['String']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null | undefined, comment?: { __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', firstName: string, lastName: string, image_url?: string | null | undefined } } | null | undefined, errors?: Array<{ __typename?: 'FieldError', type: string, error: string }> | null | undefined } };

export type CreateVideoMutationVariables = Exact<{
  createVideoInput: CreateVideoInput;
}>;


export type CreateVideoMutation = { __typename?: 'Mutation', createVideo: { __typename?: 'VideoMutationResponse', code: number, success: boolean, message?: string | null | undefined, video?: { __typename?: 'Video', id: string, title: string, description: string, commentable: boolean, thumbnailUrl?: string | null | undefined, size: string, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'FieldError', type: string, error: string }> | null | undefined } };

export type LoginMutationVariables = Exact<{
  loginInput?: InputMaybe<LoginInput>;
  socialLogin?: InputMaybe<SocialLogin>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', token?: string | null | undefined, code: number, success: boolean, message?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', type: string, error: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'UserMutationResponse', token?: string | null | undefined, code: number, success: boolean, message?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', type: string, error: string }> | null | undefined } };

export type SignupMutationVariables = Exact<{
  signupInput: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserMutationResponse', token?: string | null | undefined, code: number, success: boolean, message?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', type: string, error: string }> | null | undefined } };

export type CommentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CommentQuery = { __typename?: 'Query', comment?: { __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', firstName: string, lastName: string, image_url?: string | null | undefined } } | null | undefined };

export type CommentsQueryVariables = Exact<{
  getCmtInput: GetCommentInput;
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: { __typename?: 'PaginatedComments', totalCount: number, cursor: any, hasMore: boolean, paginatedComments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', firstName: string, lastName: string, image_url?: string | null | undefined } }> } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username?: string | null | undefined, email: string, socialId?: string | null | undefined, firstName: string, lastName: string, fullName?: string | null | undefined, channelDecscription?: string | null | undefined, image_url?: string | null | undefined, banner_id?: string | null | undefined, dateOfBirth?: any | null | undefined, role: string, createdAt: any, updatedAt: any } | null | undefined };

export type VideoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type VideoQuery = { __typename?: 'Query', video?: { __typename?: 'Video', id: string, title: string, description: string, commentable: boolean, thumbnailUrl?: string | null | undefined, size: string, createdAt: any, updatedAt: any } | null | undefined };

export type VideosQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  catagoryId?: InputMaybe<Scalars['String']>;
  catagory?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
}>;


export type VideosQuery = { __typename?: 'Query', videos?: { __typename?: 'PaginatedVideos', totalCount: number, cursor: any, hasMore: boolean, paginatedVideos: Array<{ __typename?: 'Video', id: string, title: string, description: string, commentable: boolean, thumbnailUrl?: string | null | undefined, size: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', firstName: string, lastName: string, fullName?: string | null | undefined, image_url?: string | null | undefined } }> } | null | undefined };

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
    fragment mutationStatuses on MutationResponse {
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
  fullName
  channelDecscription
  image_url
  banner_id
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
export const CreateCommentDocument = gql`
    mutation CreateComment($videoId: String!, $createCommentInput: CreateCommentInput!, $parentCommentId: String) {
  createComment(
    videoId: $videoId
    createCommentInput: $createCommentInput
    parentCommentId: $parentCommentId
  ) {
    code
    success
    message
    comment {
      ...commentInfo
      user {
        firstName
        lastName
        image_url
      }
    }
    errors {
      ...fieldError
    }
  }
}
    ${CommentInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      createCommentInput: // value for 'createCommentInput'
 *      parentCommentId: // value for 'parentCommentId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateVideoDocument = gql`
    mutation CreateVideo($createVideoInput: CreateVideoInput!) {
  createVideo(createVideoInput: $createVideoInput) {
    ...mutationStatuses
    video {
      ...videoInfo
    }
    errors {
      ...fieldError
    }
  }
}
    ${MutationStatusesFragmentDoc}
${VideoInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateVideoMutationFn = Apollo.MutationFunction<CreateVideoMutation, CreateVideoMutationVariables>;

/**
 * __useCreateVideoMutation__
 *
 * To run a mutation, you first call `useCreateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoMutation, { data, loading, error }] = useCreateVideoMutation({
 *   variables: {
 *      createVideoInput: // value for 'createVideoInput'
 *   },
 * });
 */
export function useCreateVideoMutation(baseOptions?: Apollo.MutationHookOptions<CreateVideoMutation, CreateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVideoMutation, CreateVideoMutationVariables>(CreateVideoDocument, options);
      }
export type CreateVideoMutationHookResult = ReturnType<typeof useCreateVideoMutation>;
export type CreateVideoMutationResult = Apollo.MutationResult<CreateVideoMutation>;
export type CreateVideoMutationOptions = Apollo.BaseMutationOptions<CreateVideoMutation, CreateVideoMutationVariables>;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export const CommentDocument = gql`
    query Comment($id: String!) {
  comment(id: $id) {
    ...commentInfo
    user {
      firstName
      lastName
      image_url
    }
  }
}
    ${CommentInfoFragmentDoc}`;

/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommentQuery(baseOptions: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
      }
export function useCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
        }
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = Apollo.QueryResult<CommentQuery, CommentQueryVariables>;
export const CommentsDocument = gql`
    query Comments($getCmtInput: GetCommentInput!) {
  comments(getCmtInput: $getCmtInput) {
    totalCount
    cursor
    hasMore
    paginatedComments {
      ...commentInfo
      user {
        firstName
        lastName
        image_url
      }
    }
  }
}
    ${CommentInfoFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      getCmtInput: // value for 'getCmtInput'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
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
export const VideoDocument = gql`
    query Video($id: ID!) {
  video(id: $id) {
    ...videoInfo
  }
}
    ${VideoInfoFragmentDoc}`;

/**
 * __useVideoQuery__
 *
 * To run a query within a React component, call `useVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVideoQuery(baseOptions: Apollo.QueryHookOptions<VideoQuery, VideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoQuery, VideoQueryVariables>(VideoDocument, options);
      }
export function useVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoQuery, VideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoQuery, VideoQueryVariables>(VideoDocument, options);
        }
export type VideoQueryHookResult = ReturnType<typeof useVideoQuery>;
export type VideoLazyQueryHookResult = ReturnType<typeof useVideoLazyQuery>;
export type VideoQueryResult = Apollo.QueryResult<VideoQuery, VideoQueryVariables>;
export const VideosDocument = gql`
    query Videos($limit: Int!, $cursor: String, $userId: String, $user: [String!], $catagoryId: String, $catagory: [String!], $query: String) {
  videos(
    limit: $limit
    cursor: $cursor
    userId: $userId
    user: $user
    catagoryId: $catagoryId
    catagory: $catagory
    query: $query
  ) {
    totalCount
    cursor
    hasMore
    paginatedVideos {
      ...videoInfo
      user {
        firstName
        lastName
        fullName
        image_url
      }
    }
  }
}
    ${VideoInfoFragmentDoc}`;

/**
 * __useVideosQuery__
 *
 * To run a query within a React component, call `useVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideosQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      userId: // value for 'userId'
 *      user: // value for 'user'
 *      catagoryId: // value for 'catagoryId'
 *      catagory: // value for 'catagory'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useVideosQuery(baseOptions: Apollo.QueryHookOptions<VideosQuery, VideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
      }
export function useVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideosQuery, VideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
        }
export type VideosQueryHookResult = ReturnType<typeof useVideosQuery>;
export type VideosLazyQueryHookResult = ReturnType<typeof useVideosLazyQuery>;
export type VideosQueryResult = Apollo.QueryResult<VideosQuery, VideosQueryVariables>;