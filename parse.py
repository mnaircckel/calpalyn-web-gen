def taxa_file_labels(file_name):
    pos = []
    neg = []
    pairs = {}
    with open(file_name, 'r') as f:
        lines = f.read().splitlines()
        for row in lines:
            cols = row.split()
            if len(cols) > 0:
                num = cols[0]
                label = ' '.join(cols[1:])
                replace = ['|', '*', '#']
                for r in replace:
                    label = label.replace(r, '')
                label = label.strip()
                if len(label) == 0:
                    continue
                elif num >= '0':
                    pos.append(label)
                else:
                    neg.append(label)
                pairs[label] = num

    return pos, neg, pairs

def data_file_nums(file_name):
    nums = []
    with open(file_name, 'r') as f:
        rows = f.read().splitlines()
        if len(rows) > 0:
            nums = rows[0].split(',')[1:]
    return nums
