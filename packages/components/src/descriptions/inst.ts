export interface ProDescriptionsInst {
  /**
   * 重新调用 request
   */
  reload: (params?: any) => Promise<void>
}
