import { useCallback, useRef, useEffect } from 'react';

/**
 * Type
 * @description 函数ref
 */
type FnRef = {
  fn: () => void;
  timer: NodeJS.Timeout | null;
};

/**
 * 防抖
 * @param {Function} fn 执行事件
 * @param {Number} wait 等待时间
 * @returns {Array<Function>}
 */
const useDebounce: (F: () => void, W: number) => [() => void, () => void] = (
  fn,
  wait
) => {
  // 绑定传入的函数 创建定时器
  const { current } = useRef<FnRef>({ fn, timer: null });

  /**
   * Callback
   * 执行操作 事件
   */
  const run: () => void = useCallback(() => {
    // 如果存在定时器 清空
    if (current.timer) {
      clearTimeout(current.timer);
    }
    // 否则 创建定时器执行传入任务
    current.timer = setTimeout(() => {
      current.fn();
    }, wait);
  }, [wait]);

  /**
   * Callback
   * 取消操作 事件
   */
  const cancel: () => void = useCallback(() => {
    // 如果存在定时器 清空
    if (current.timer) {
      clearTimeout(current.timer);
    }
  }, []);

  /**
   * Effect
   * 监听传入的函数
   */
  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  /**
   * Effect
   * 卸载 移除任务 清空定时器
   */
  useEffect(() => () => cancel(), [wait]);

  return [run, cancel];
};

export default useDebounce;
