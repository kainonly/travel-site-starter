import { App, Form, ModalFuncProps } from 'antd';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import React from 'react';

export interface WpxOpenProps<T> extends ModalFuncProps {
  values?: T;
  onSubmit: (v: T) => Promise<void>;
}

export function useModalForm<T>(render: (form: FormInstance<T>) => React.ReactNode) {
  const { modal } = App.useApp();
  const [form] = Form.useForm<T>();

  return {
    form,
    open(props: WpxOpenProps<T>) {
      if (props.values) {
        form.setFieldsValue(props.values);
      } else {
        form.resetFields();
      }
      modal.confirm({
        icon: null,
        content: render(form),
        onOk: () =>
          new Promise(async (resolve, reject) => {
            try {
              const data = await form.validateFields();
              await props.onSubmit(data);
              resolve(0);
            } catch (e) {
              reject(e);
            }
          }),
        ...props
      });
    }
  };
}
