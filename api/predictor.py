from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch


tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')


def predict(text):
    generated = tokenizer.encode(text)
    context = torch.tensor([generated])
    past = None
    output_cap = 20
    sentences_left = 1

    while output_cap > 0:
        print(output_cap)
        output, past = model(context, past=past)
        token = torch.argmax(output[..., -1, :])
        generated += [token.tolist()]
        context = token.unsqueeze(0)

        cur_token = tokenizer.decode([token.tolist()])
        if cur_token == '.' or cur_token == '!' or cur_token == '?':
            sentences_left -= 1
            if sentences_left <= 0:
                break

        output_cap -= 1

    sequence = tokenizer.decode(generated)
    return sequence
